// server/views/vm/vm-artist.js

import fs from 'fs';
import cachedGet from '../../bin/common/cachedGet';
import wiki from './vm_wiki';

import _ from 'lodash';
import smartSearch from 'smart-search';
export default opt => {
	//console.log('artistDetail', opt)
	return (
		cachedGet(
			`/api/Artists/search/${encodeURIComponent(opt.artistName).replace(
				'#',
				'%23'
			)}`,
			{ baseURL: opt.baseUrl }
		)
			.then(x => _.get(x, 'data.data', {}))
			.then(artistSearch => {
				if (!artistSearch.length) {
					res.status(404).send('Not Found')
					throw new Error('No Search Results')
				}
				if (artistSearch.length === 1) return artistSearch[0].id
				const favs = _.take(
					smartSearch(artistSearch, [opt.artistName], { name: true }),
					1
				).map(x => x.entry)
				return favs.length ? favs[0].id : artistSearch[0].id
			})
			//for an artistId, display: image, lineups => festivals, reviews, stats
			.then(artistId => {
				const imgFilter = JSON.stringify({
					where: {
						subjectType: 2,
						subject: artistId,
						deleted: false
					}
				})
				const lineFilter = JSON.stringify({
					where: {
						band: artistId,
						deleted: false
					}
				})
				//console.log('vm_artist img', imgFilter)
				return Promise.all([
					cachedGet(`/api/Artists/stats/${artistId}`, { baseURL: opt.baseUrl })
						.catch(
							err =>
								(err.response &&
									err.response.status &&
									err.response.status === 404) ||
								console.error('/api/Artists err', err)
						)
						.then(x => _.get(x, 'data.data', {})),
					cachedGet(`/api/Artists/${artistId}`, { baseURL: opt.baseUrl })
						.catch(
							err =>
								(err.response &&
									err.response.status &&
									err.response.status === 404) ||
								console.error('/api/Artists err', err)
						)
						.then(x => _.get(x, 'data', {})),
					cachedGet(`/api/Images?filter=${imgFilter}`, { baseURL: opt.baseUrl })
						//.then(x => console.log('img res', x) || x)
						.catch(
							err =>
								(err.response &&
									err.response.status &&
									err.response.status === 404) ||
								console.error('/api/Images err', err)
						)
						.then(x => _.get(x, 'data[0]', {})),
					cachedGet(`/api/Lineups?filter=${lineFilter}`, {
						baseURL: opt.baseUrl
					})
						.catch(
							err =>
								(err.response &&
									err.response.status &&
									err.response.status === 404) ||
								console.error('/api/Lineups err', err)
						)
						.then(x => _.get(x, 'data', []).map(l => l.festival))
						.then(festivalIds =>
							cachedGet(
								`/api/Festivals/name/chains?events=${JSON.stringify(
									festivalIds
								)}`,
								{ baseURL: opt.baseUrl }
							)
						)
						.catch(
							err =>
								(err.response &&
									err.response.status &&
									err.response.status === 404) ||
								console.error('/api/Artists err', err)
						)
						.then(x => _.get(x, 'data.data', [])),
					//.then(x => console.log('Lineups fest data', x) || x)
					cachedGet(`/api/Messages/reviews/2/${artistId}`, {
						baseURL: opt.baseUrl
					})
						.catch(
							err =>
								(err.response &&
									err.response.status &&
									err.response.status === 404) ||
								console.error('/api/Messages err', err)
						)
						.then(x => _.get(x, 'data.data', [])),
					wiki({ name: opt.artistName })
				])
			})
			.then(([stats, artist, image, lineups, reviews, description]) => {
				//console.log('vm_artist model', artist)
				//get artist reviews
				return { stats, model: artist, image, lineups, reviews, description }
			})
	)
	//.then(x => console.log('artistDetail get', x) || x)
}

