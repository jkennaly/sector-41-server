// server/views/vm/vm-festival.js

import fs from 'fs';
import cachedGet from '../../bin/common/cachedGet';

import _ from 'lodash';
export default opt => {
	//console.log('vm_festival opt', opt)
	return cachedGet(
		`/api/Series/?filter=${JSON.stringify({ where: { name: opt.seriesName } })}`,
		{ baseURL: opt.baseUrl }
	)
		.catch(
			err =>
				(err.response && err.response.status && err.response.status === 404) ||
				console.error('/api/Images err', err)
		)
		.then(x => _.get(x, 'data[0]', {}))
		.then(series => {
			return cachedGet(
				`/api/Festivals/?filter=${JSON.stringify({
					where: { series: series.id }
				})}`,
				{ baseURL: opt.baseUrl }
			)
				.catch(
					err =>
						(err.response &&
							err.response.status &&
							err.response.status === 404) ||
						console.error('/api/Images err', err)
				)
				.then(x => _.get(x, 'data', []))
				.then(festivals => {
					if (!festivals.length) return [festivals]
					const picked =
						opt.festivalYear &&
						festivals.find(f => f.year === opt.festivalYear)
					if (picked) return [festivals, picked]
					const sorted = festivals.sort(
						(a, b) => parseInt(b.year, 10) - parseInt(a.year, 10)
					)
					return [festivals, sorted[0]]
				})
		//.then(x => console.log('vm_festival festivals', x) || x)
				.then(([festivals, festival]) => {
					return Promise.all([
						festivals,
						festival,
						cachedGet(`/api/Festivals/stats/${festival.id}`, {
							baseURL: opt.baseUrl
						})
							.catch(
								err =>
									(err.response &&
										err.response.status &&
										err.response.status === 404) ||
									console.error('/api/Images err', err)
							)
							.then(x => _.get(x, 'data.data', [])),
						cachedGet(
							`/api/Lineups/?filter=${JSON.stringify({
								where: { festival: festival.id }
							})}`,
							{ baseURL: opt.baseUrl }
						)
							.catch(
								err =>
									(err.response &&
										err.response.status &&
										err.response.status === 404) ||
									console.error('/api/Images err', err)
							)
							.then(x => _.get(x, 'data', []))
							.then(lineups => {
								const artistIds = lineups.map(x => x.band)
								return cachedGet(
									`/api/Artists/?filter=${JSON.stringify({
										where: { id: { inq: artistIds } }
									})}`,
									{ baseURL: opt.baseUrl }
								)
									.catch(
										err =>
											(err.response &&
												err.response.status &&
												err.response.status === 404) ||
											console.error('/api/Images err', err)
									)
									.then(x => _.get(x, 'data', []))
							})
					])
				})
				.then(([festivals, festival, stats, artists]) => {
					//console.log('vm_festival', festivals, festival, stats, artists)
					return { series, festivals, festival, stats, artists }
				})
		})
	//.then(x => console.log('festivalDetail get', x) || x)
}
