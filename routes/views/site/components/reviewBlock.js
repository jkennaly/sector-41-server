// server/views/site/components/reviewBlock.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
import m from 'mithril';

import Review from './review';
import SubjectLink from './subjectLink';
const timeSince = {}

const stats = {
	view: ({ attrs }) => m(
		'section[aria-labelledby="notes-title"]',
		m('div.bg-white.shadow.sm:rounded-lg.sm:overflow-hidden', [
			m('div.divide-y.divide-gray-200', [
				m(
					'div.px-4.py-5.sm:px-6',
					m(
						'h2.text-lg.font-medium.text-gray-900[id="notes-title"]',
						'Reviews'
					)
				),
				m(
					'div.px-4.py-6.sm:px-6',
					m(
						'ul.space-y-8',
						attrs.reviews.map(review => m(Review, { review, subject: attrs.subject, subjectType: attrs.subjectType }))
					)
				)
			]),
			m(
				'div.flex.flex-col',
				m(SubjectLink, {subject: attrs.subject, subjectType: attrs.subjectType, plainName: attrs.plainName})
			)
		])
	)
}

export default stats
