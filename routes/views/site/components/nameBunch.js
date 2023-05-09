// server/views/site/components/nameBunch.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
import m from 'mithril';
import _ from 'lodash';

import Review from './review';
const timeSince = {}

const stats = {
	view: ({ attrs }) =>
		m(
			'section[aria-label="lineups"]',
			m('div.bg-white.shadow.sm:rounded-lg.sm:overflow-hidden', [
				attrs.lineups && attrs.lineups.map(l => m('a', {href: '/site/festivals/' + l.reduce((base, e) => {
					//append the festival year, prepend the series
					if(_.isNumber(e.hiatus)) return `${e.name}/${base}`
					if(_.isString(e.year)) return `${base}${e.year}`
					return base
				}, '')},
					m(
						'button.inline-flex.items-center.px-3.py-1.5.border.border-transparent.text-xs.font-medium.rounded-full.shadow-sm.text-white.bg-indigo-600.hover:bg-indigo-700.focus:outline-none.focus:ring-2.focus:ring-offset-2.focus:ring-indigo-500[type="button"]',
						l.reduce((pn, e) => `${pn} ${e.name || e.year}`, '')
					))
				)
			])
		)
}

export default stats
