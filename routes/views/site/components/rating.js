// server/views/site/components/rating.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
import m from 'mithril';
import _ from 'lodash';

const rating = {
	view: ({ attrs }) =>
		m(
			'div.flex.justify-center.items-center',
			{},
			m('div.flex.items-center.mt-2.mb-4', {}, 
				m.trust(`<svg class="mx-0.5 w-1/6 flex-shrink-0 fill-current ${attrs.rating ? 'text-yellow-500' : 'text-gray-400'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>`),
				m.trust(`<svg class="mx-0.5 w-1/6 flex-shrink-0 fill-current ${attrs.rating > 1.4 ? 'text-yellow-500' : 'text-gray-400'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>`),
				m.trust(`<svg class="mx-0.5 w-1/6 flex-shrink-0 fill-current ${attrs.rating > 2.4 ? 'text-yellow-500' : 'text-gray-400'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>`),
				m.trust(`<svg class="mx-0.5 w-1/6 flex-shrink-0 fill-current ${attrs.rating > 3.4 ? 'text-yellow-500' : 'text-gray-400'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>`),
				m.trust(`<svg class="mx-0.5 w-1/6 flex-shrink-0 fill-current ${attrs.rating > 4.4 ? 'text-yellow-500' : 'text-gray-400'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>`),
    
			),
			_.isNumber(attrs.count) ? `(${attrs.count})` : ''

		)
}

export default rating
