// server/views/site/components/rating.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
import m from 'mithril';
import _ from 'lodash';
import appUrl from '../../../../bin/common/appUrl.js';

const rating = {
	view: ({ attrs }) =>
		m('div.mt-6.flex.flex-col-reverse.justify-stretch.space-y-4.space-y-reverse.sm:flex-row-reverse.sm:justify-end.sm:space-x-reverse.sm:space-y-0.sm:space-x-3.md:mt-0.md:flex-row.md:space-x-3', 
	m('a', {href: appUrl({subject: attrs.subject, subjectType: attrs.subjectType})},
	m('button.inline-flex.items-center.justify-center.px-4.py-2.border.border-transparent.text-sm.font-medium.rounded-md.shadow-sm.text-white.bg-blue-600.hover:bg-blue-700.focus:outline-none.focus:ring-2.focus:ring-offset-2.focus:ring-offset-gray-100.focus:ring-blue-500[type="button"]',
		`Review ${attrs.plainName}`
	))
)
}

export default rating
