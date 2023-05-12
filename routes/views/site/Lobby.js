// server/views/site/Lobby.js

// Make Mithril happy
if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}

import m from 'mithril';
import render from 'mithril-node-render';
import _ from 'lodash';


import EventRow from './EventRow.js';
import SessionRow from './SessionRow.js';
import GameRow from './GameRow.js';
import Pagination from './components/pagination.js';
import CreateButton from './components/createButton.js';
import vm from '../../vm/vm_list.js';

import fs from 'fs';
import path from "path"
import url from 'url';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const template = fs.readFileSync(path.resolve(__dirname, './shell.html'), 'utf8')

const modelRow = {
    event: EventRow,
    sessions: SessionRow,
    games: GameRow,
}

const modelHeaders = {
    event: m("tr", [
        m("th", "Event Name"),
        m("th", "Date"),
        m("th", "Location"),
        m("th", "Details"),
    ]),
    sessions: m("tr", [
        m("th", "Session Name"),
        m("th", "Status"),
        m("th", "Completed At"),
        m("th", "Created At"),
        m("th", "Details"),
      ]),
      games: m("tr", [
        m("th", "Game Name"),
        m("th", "Status"),
        m("th", "Completed At"),
        m("th", "Created At"),
        m("th", "Max Players"),
        m("th", "Game Length"),
        m("th", "Game Type"),
        m("th", "Details"),
      ]) 
}

const Lobby = (options) =>
	function(req, res, next) {
		const baseUrl = `${req.protocol}://${req.get('host')}`
		const url = `/api/${req.params.eventModel}`
		const opt = Object.assign(options, {eventModel: req.params.eventModel}, { baseUrl: baseUrl, url: url }, req.params)
		const page = _.get(req, 'query.page', '0')
		const pageNo = parseInt(page, 10)
		const path = baseUrl + `/site/?page=${pageNo}`

		vm(opt)
			.then(fullData => {
				const allData = !pageNo || fullData.length < 200
				const startIndex = allData ? 0 : (pageNo - 1) * 100
				const end = allData ? undefined : startIndex + 100
				const pageData = fullData.slice(startIndex, end)
				const pageCount = Math.ceil(fullData.length / 100)
				const totalCount = fullData.length
				//console.log('req lengths', startIndex, end, fullData.length, pageData.length)
				return [pageData, allData, pageNo, pageCount, totalCount]
			})
			.then(([data, allData, pageNo, pageCount, totalCount]) => Promise.all([
                render(
                    m("div", [
                        m("h2", { className: "text-2xl font-bold mb-4" }, "Events"),
                    
                        m("table", { className: "table-auto w-full" }, [
                            m("thead", [
                            modelHeaders[opt.eventModel] || modelHeaders.event,
                            ]),
                            m(
                            "tbody",
                            data.map((event) =>
                                m(modelRow[opt.eventModel] || EventRow, {
                                key: event.id,
                                event,
                                })
                            )
                            ),
                        ])
                    ])
                ), 
                options.showCreate ? render(
                    m(CreateButton)
                ) : ``, 
                allData ? `` : render(
                    m(Pagination, {pageNo, pageCount, totalCount, path})
                )
            ]))
		//.then(x => console.log('vm list rendered', x) || x)
			.then(([rendered, createButton, pagination]) => template.replace(
						'<div id="component"></div>',
						rendered
					).replace(
						'<div id="pagination"></div>',
						pagination
					).replace(
						'<div id="create-button"></div>',
						createButton
					)
				
			)
			.then(html => {
				res.locals.html = html
				next()
			})

			.catch(err => {
				console.error(err,
					'Lobby gen error baseUrl, url',
					baseUrl, 
					url
				)
				next(err)
			})
	}

export default Lobby
