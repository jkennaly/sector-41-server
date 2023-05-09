// server/views/site/components/ratingStat.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
import m from 'mithril';
import _ from 'lodash';

import Star from './star';
const ratingStat = {
	view: ({ attrs }) =>
	m('div.px-4.py-5.bg-white.shadow.rounded-lg.overflow-hidden.sm:p-6', 
	m('span.text-sm.font-medium.text-gray-500.truncate', 
		attrs.title ? attrs.title : ' Avg. Rating ',
		m(
			'div.flex.justify-center.items-center',
			{},
			m('div.flex.items-center.mt-2.mb-4', {}, 
				m(Star, {fillColorClass: `fill-current.${attrs.rating ? 'text-yellow-500' : 'text-gray-400'}`}),
				m(Star, {fillColorClass: `fill-current.${attrs.rating > 1.4 ? 'text-yellow-500' : 'text-gray-400'}`}),
				m(Star, {fillColorClass: `fill-current.${attrs.rating > 2.4 ? 'text-yellow-500' : 'text-gray-400'}`}),
				m(Star, {fillColorClass: `fill-current.${attrs.rating > 3.4 ? 'text-yellow-500' : 'text-gray-400'}`}),
				m(Star, {fillColorClass: `fill-current.${attrs.rating > 4.4 ? 'text-yellow-500' : 'text-gray-400'}`})





    
			),
			_.isNumber(attrs.count) ? `(${attrs.count})` : ''

		)
	)
)
}

export default ratingStat
