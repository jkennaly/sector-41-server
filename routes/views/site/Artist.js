// server/views/site/List.js

// Make Mithril happy
if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}

import m from 'mithril';
import render from 'mithril-node-render';

import _ from 'lodash';

import vm from '../../vm/vm_artist';
import Rating from './components/rating';
import Stats from './components/stats';
import Name from './components/name';
import Description from './components/description';
import ReviewBlock from './components/reviewBlock';
import NameBunch from './components/nameBunch';
import SubjectLink from './components/subjectLink';

import fs from 'fs';
const shell = fs.readFileSync('./server/views/site/shell.html', 'utf8')
const detail = fs.readFileSync('./server/views/site/detail.frag.html', 'utf8')

const List = options =>
	function(req, res, next) {
		const baseUrl = `${req.protocol}://${req.get('host')}`
		//console.log('req host', baseUrl)
		const url = `/api/${options.apiModel}`
		const opt = Object.assign({}, options, { baseUrl: baseUrl, url: url }, req.params)

		return vm(opt)
			.then(({stats, model, image, lineups, reviews, description}) => {
				//console.log('Artist reviews', reviews)
				const wikiText = _.get(description, '[0]', '')
				return Promise.all([
					render(Rating, {rating: _.get(stats, 'averageRating', 0), count: _.get(stats, 'artistRatingCount', 0),}),
					render(Rating, {rating: _.get(stats, 'setRating', 0), count: _.get(stats, 'setRatingCount', 0),}),
					!wikiText ? undefined : render(Description, {heading: 'From Wikipedia', text: wikiText, link: _.get(description, '[1]', '')}),
					_.get(stats, 'checkinCount', 0),
					render(Stats, {}),
					render(Name, {name: _.get(model, 'name', ''), subtitle: 'Artist'}),
					_.get(model, 'name', ''),
					`<img class="h-16 w-16 rounded-full" src='${_.get(image, 'url', '')}' />`,
					render(ReviewBlock, {reviews, subjectType: 2, subject: model.id, plainName: _.get(model, 'name', '')}),
					render(NameBunch, {lineups}),
					render(SubjectLink, {subjectType: 2, subject: model.id, plainName: _.get(model, 'name', '')})
				].map(x => x ? x : ''))
			})
			.then(([subjectRating, setRating, description, setCheckin, stats, name, namePlain, img, reviews, lineups, appLink]) => {
				//console.log('Artist subjectRating', subjectRating)
				const rendered = detail
					.replace('<div id="subject-stats"></div>', stats)
					.replace('<div id="subject-name"></div>', name)
					.replace('<div id="subject-rating"></div>', subjectRating)
					.replace('<span id="plain-name"></span>', namePlain)
					.replace('<div id="set-rating"></div>', setRating)
					.replace('<div id="set-checkins"></div>', setCheckin)
					.replace('<div id="subject-description"></div>', description)
					.replace('<div id="subject-img"></div>', img)
					.replace('<div id="subject-reviews"></div>', reviews)
					.replace('<div id="subject-links"></div>', lineups)
					.replace('<div id="app-link"></div>', appLink)
					.replace('<title>FestiGram</title>', `${namePlain} | FestiGram`)
				return rendered
			})
			.then(rendered =>
					shell.replace(
						'<div id="component"></div>',
						rendered
					)
				)
			.then(html => {
				res.locals.html = html
				next()
			})

			.catch(next)
	}

export default List
