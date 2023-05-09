// server/views/site/components/ratingStat.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
import m from 'mithril';
import _ from 'lodash';

const ratingStat = {
	view: ({ attrs, children }) =>
	m('div.px-4.py-5.bg-white.shadow.rounded-lg.overflow-hidden.sm:p-6', 
	m('span.text-sm.font-medium.text-gray-500.truncate', 
		attrs.title ? attrs.title : ' Avg. Rating ',
		m(
			'div.flex.justify-center.items-center',
			{},
			children

		)
	)
)
}

export default ratingStat
