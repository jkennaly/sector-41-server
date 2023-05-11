// server/views/site/ListByName.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
import m from 'mithril';

const ListByName = {
	view: ({ attrs }) =>
		m(
			'div.grid.grid-cols-1.gap-4.sm:grid-cols-2[name=fts-item-list]',
			{},

			//console.log('ListByName view state', state) || state.allSeries && state.allSeries.map &&
			(attrs.data ? attrs.data : [])
				//.filter(x => !console.log('Festival:', x))
				.sort((a, b) => a.name.localeCompare(b.name))
				.map(s =>
					m(
							'a.focus:outline-none[name=fts-item]',
							{
								href: `${attrs.baseRoute}${encodeURIComponent(
									s.id || s.name
								).replace('#', '%23')}`
							},
							m(
						'div.relative.rounded-lg.border.border-gray-300.bg-white.px-6.py-5.shadow-sm..space-x-3.hover:border-gray-400.focus-within:ring-2.focus-within:ring-offset-2.focus-within:ring-indigo-500',
						{},
						m('p.overflow-hidden.whitespace-nowrap', s.name)
						)
					)
				)
		)
}


export default ListByName
