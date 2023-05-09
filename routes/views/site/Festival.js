// server/views/site/Festival.js

// Make Mithril happy
if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}

import m from 'mithril';
import render from 'mithril-node-render';

import _ from 'lodash';

import vm from '../../vm/vm_festival';
import Rating from './components/rating';
import RatingStat from './components/ratingStat';
import CardSubject from './components/cardSubject';
import Stat from './components/stat';
import Stats from './components/stats';
import Name from './components/name';
import Description from './components/description';
import ReviewBlock from './components/reviewBlock';
import YearBunch from './components/yearBunch';
import ArtistBunch from './components/artistBunch';
import SubjectLink from './components/subjectLink';

import fs from 'fs';
import path from "path"
import url from 'url';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const shell = fs.readFileSync(path.resolve(__dirname, './shell.html'), 'utf8')
const detail = fs.readFileSync(path.resolve(__dirname, './detail.frag.html'), 'utf8')

const Festival = options =>
	function(req, res, next) {
		const baseUrl = `${req.protocol}://${req.get('host')}`
		//console.log('Festival host', baseUrl)
		const url = `/api/Festivals`
		const opt = Object.assign({}, options, { baseUrl: baseUrl, url: url }, req.params)

		return vm(opt)
			.then(({ series, festivals, festival, stats, artists }) => {
				console.log('Festival lovedArtistId', stats.lovedArtistId)
				const loved = artists.find(a => a.id === stats.lovedArtistId[0])
				if(loved) loved.rating = stats.lovedArtistId[1]
				const hated = artists.find(a => a.id === stats.hatedArtistId[0])
				if(hated) hated.rating = stats.hatedArtistId[1]
				const stat1 = m( RatingStat,
					{
						rating: _.get(stats, 'artistRating', 0),
						count: _.get(stats, 'artistRatingCount', 0),
						title: 'Avg. Artist Rating'
					}
				)
				const stat2 = stats.setRating ? m( RatingStat,
					{
						rating: _.get(stats, 'setRating', 0),
						count: _.get(stats, 'setRatingCount', 0),
						title: 'Avg. Set Rating'
					}
				) : m( Stat,
					{
						title: 'Most Loved Artist'
					}, m(CardSubject, {subject: loved, subjectType: 2})
				)
				const stat3 = stats.setCheckin ? m(Stat,
					{
						title: 'Total Set Checkins'
					}, `${stats.setCheckin}`
				) : m(Stat,
					{
						title: 'Most Hated Artist'
					}, m(CardSubject, {subject: hated, subjectType: 2})
				)
				//console.log('festival stats', stats, loved, hated)
				return Promise.all(
					[
						render(stat1),
						render(stat2),
						render(stat3),
						render(Stats, {}),
						render(Name, {
							name: `${series.name} ${festival.year}`,
							subtitle: `<a href="${
								series.website
							}" target="_blank>Festival Website</a>`
						}),
						`${series.name} ${festival.year}`,
						render(YearBunch, {
							series,
							festivals: festivals.filter(f => f.id !== festival.id)
						}),
						render(SubjectLink, {
							subjectType: 7,
							subject: festival.id,
							plainName: `${series.name} ${festival.year}`
						}),
						render(ArtistBunch, {
							artists
						})
					].map(x => (x ? x : ''))
				)
			})
			.then(
				([
					stat1,
					stat2,
					stat3,
					stats,
					name,
					namePlain,
					lineups,
					appLink,
					artists
				]) => {
					//console.log('Artist subjectRating', subjectRating)
					const rendered = detail
						.replace('<div id="subject-stats"></div>', stats)
						.replace('<div id="subject-name"></div>', name)
						.replace('<div id="stat1"></div>', stat1)
						.replace('<span id="plain-name"></span>', namePlain)
						.replace('<div id="stat2"></div>', stat2)
						.replace('<div id="stat3"></div>', stat3)
						.replace('<div id="subject-links"></div>', lineups)
						.replace('<div id="app-link"></div>', appLink)
						.replace('<div id="subject-reviews"></div>', artists)
					return [rendered, namePlain]
				}
			)
			.then(([rendered, namePlain]) => shell
				.replace('<title>FestiGram</title>', `<title>${namePlain} | FestiGram</title>`)
				.replace('<div id="component"></div>', rendered)
			)
			.then(html => {
				res.locals.html = html
				next()
			})

			.catch(next)
	}

export default Festival
