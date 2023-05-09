// server/views/site/components/star.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
import m from 'mithril';
import _ from 'lodash';

const star = {
	view: ({ attrs }) =>
		m(
			`svg.mx-0.5.w-1/6.flex-shrink-0.${attrs.fillColorClass}[xmlns="http://www.w3.org/2000/svg"][viewBox="0 0 20 20"]`,
			m(
				'path[d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"]'
			)
		)
}

export default star
