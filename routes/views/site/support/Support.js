// server/views/site/support/Support.js

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
const template = fs.readFileSync(path.resolve(__dirname, '../shell.html'), 'utf8')
const support = fs.readFileSync(path.resolve(__dirname, './support.frag.html'), 'utf8')
const request = fs.readFileSync(path.resolve(__dirname, './request.frag.html'), 'utf8')
const problem = fs.readFileSync(path.resolve(__dirname, './problem.frag.html'), 'utf8')
const other = fs.readFileSync(path.resolve(__dirname, './other.frag.html'), 'utf8')

const page = options =>
	function(req, res, next) {
		//console.log('support')
		
		const html = template.replace(
						'<div id="component"></div>',
						support
					).replace(
						'<div id="request"></div>',
						request
					).replace(
						'<div id="problem"></div>',
						problem
					).replace(
						'<div id="other"></div>',
						other
					)
		res.locals.html = html
		next()
		
	}

export default page
