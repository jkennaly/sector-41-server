'use strict'

// Make Mithril happy
if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}

import m from 'mithril';
import render from 'mithril-node-render';



import List from '../views/site/List.js';
import Landing from '../views/site/Landing.js';
import Support from '../views/site/support/Support.js';
import Request from '../views/site/support/post/Request.js';
import Problem from '../views/site/support/post/Problem.js';
import Other from '../views/site/support/post/Other.js';
import Game from '../views/site/Game.js';
import AddGame from '../views/site/AddGame.js';

import fs from 'fs'
import path from "path"
import url from 'url';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const template = fs.readFileSync(path.resolve(__dirname, '../views/site/shell.html'), 'utf8')

import cachedGet from '../../bin/common/cachedGet.js';
import cachedMon from '../../bin/common/cachedMon.js';

const festivalDetail = options =>
	function (req, res, next) {
		//const baseUrl = req.app.get('url').replace(/\/$/, '')
		const baseUrl = `${req.protocol}://${req.get('host')}`
		//console.log('req host', baseUrl)
		const opt = Object.assign({}, options, { baseUrl: baseUrl })

		const params = req.params
	}


const lineupDetail = options =>
	function (req, res, next) {
		const baseUrl = `${req.protocol}://${req.get('host')}`
		//console.log('req host', baseUrl)
		const opt = Object.assign({}, options, { baseUrl: baseUrl })

		cachedGet(`/api/${opt.apiModel}`, { baseURL: baseUrl })
			.then(x => x.data)
			.then(series => series.filter(x => !x.deleted))
			.then(data =>
				res.send(
					template.replace(
						'<div id="component"></div>',
						render.sync(m(options.list, { data: data }))
					)
				)
			)
			.catch(console.error)
	}

export function siteRouter(app) {
	app.get('/', Landing(), cachedMon)
	app.post(
		'/site/support/request',
		Request(),
		Support(),
		cachedMon
	)
	app.post(
		'/site/support/problem',
		Problem(),
		Support(),
		cachedMon
	)
	app.post(
		'/site/support/other',
		Other(),
		Support(),
		cachedMon
	)
	app.get(
		'/site/',
		cachedMon,
		Landing(),
		cachedMon
	)
	app.get(
		'/site/support',
		cachedMon,
		Support(),
		cachedMon
	)

	app.get(
		/site\/games\/?$/,
		cachedMon,
		List({
			apiModel: 'Games',
			baseRoute: '/site/games/',
			path: '/site/games?page=',
			showCreate: true
		}),
		cachedMon
	)

	app.get(
		'/site/games/edit/:gameId',
		cachedMon,
		AddGame(),
		cachedMon
	)

	app.get(
		'/site/games/:gameId',
		cachedMon,
		Game({
		}),
		cachedMon
	)

}
