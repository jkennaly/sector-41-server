// server/views/site/components/name.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
import m from 'mithril';

const stats = {
	view: ({ attrs }) =>
		m.trust(`<div>
          <h1 class="text-2xl font-bold text-gray-900">${attrs.name}</h1>
          <p class="text-sm font-medium text-gray-500">${attrs.subtitle}</p>
        </div>`)
}

export default stats
