// server/views/site/components/cardSubject.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
import m from 'mithril';
import _ from 'lodash';

import Rating from './rating';
import appUrl from '../../../../bin/common/appUrl';
const cardSubject = {
	view: ({ attrs }) =>
		m(
			'div.relative.bg-white.pt-5.px-0.5.pb-12.sm:pt-6.sm:px-0.5.shadow.rounded-lg.overflow-hidden',
			attrs.subject ? [
				m('dt', [
					m(
						'div.absolute.bg-indigo-500.rounded-md.p-3.w-1/4',
						m(
							'svg.h-6.w-6.text-white[xmlns="http://www.w3.org/2000/svg"][fill="none"][viewBox="0 0 24 24"][stroke="currentColor"][aria-hidden="true"]',
							m(
								'path[stroke-linecap="round"][stroke-linejoin="round"][stroke-width="2"][d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"]'
							)
						)
					),
					m(
						'p.ml-16.text-sm.font-medium.text-gray-500.truncate',
						attrs.subject.name
					)
				]),
				m('dd.ml-16.pb-6.flex.items-baseline.sm:pb-7', [
					m(Rating, {rating: attrs.subject.rating}),

					m(
						'div.absolute.bottom-0.inset-x-0.bg-gray-50.px-4.py-4.sm:px-6',
						m(
							'div.text-sm',
							m(
								`a.font-medium.text-indigo-600.hover:text-indigo-500[href="${appUrl({subject: attrs.subject.id, subjectType: attrs.subjectType})}"]`,
								[
									' View in App'
								]
							)
						)
					)
				])
			] : ''
		)
}

export default cardSubject
