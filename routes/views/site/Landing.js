// server/views/site/Landing.js

// Make Mithril happy
if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}

import m from 'mithril';
import render from 'mithril-node-render';
import fs from 'fs';
import path from "path"
import url from 'url';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const template = fs.readFileSync(path.resolve(__dirname, './shell.html'), 'utf8')
const landing = fs.readFileSync(path.resolve(__dirname, './landing.frag.html'), 'utf8')

const Landing = options =>
	function(req, res, next) {
		//console.log('landing')
		
		const html = template.replace(
						'<div id="component"></div>',
						landing
					)
		res.locals.html = html
		next()
		
	}

export default Landing
