// server/views/site/Game.js

// Make Mithril happy
if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}

import m from 'mithril';
import render from 'mithril-node-render';

import _ from 'lodash';

import vm from '../../vm/vm_game.js';
import Rating from './components/rating.js';
import RatingStat from './components/ratingStat.js';
import CardSubject from './components/cardSubject.js';
import Stat from './components/stat.js';
import Stats from './components/stats.js';
import Name from './components/name.js';
import Description from './components/description.js';
import ReviewBlock from './components/reviewBlock.js';
import YearBunch from './components/yearBunch.js';
import ArtistBunch from './components/artistBunch.js';
import SubjectLink from './components/subjectLink.js';
import GameDetail from './components/GameDetail.js';

import fs from 'fs';
import path from "path"
import url from 'url';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const shell = fs.readFileSync(path.resolve(__dirname, './shell.html'), 'utf8')

const Game = options =>
	async function(req, res, next) {
		const baseUrl = `${req.protocol}://${req.get('host')}`
		//console.log('Game host', baseUrl)
		const url = `/api/Games`
		const opt = Object.assign({}, options, { baseUrl: baseUrl, url: url }, req.params)

		try {
			const games = await vm(opt)
			const game = games.find(g => g.id === opt.id)
			const detail = render(GameDetail, { game })
			const html = shell
				.replace('<div id="component"></div>', detail)
			res.locals.html = html
			return next()
		} catch (err) {
			return next(err)
		}
		
				
			
	}

export default Game
