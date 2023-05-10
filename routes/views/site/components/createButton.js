// server/views/site/createButton.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
import m from 'mithril';

const button = {
	view: ({ attrs }) =>
	m('div', { class: 'flex justify-between items-center mb-6' }, [
        m('div', { class: 'text-2xl font-bold text-black' }, 'Game List'),
        m('a', { href: '/site/games/edit/new' },
            m('button', { class: 'px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none' }, 'Create New Game')
        )
         
    ]),
}

export default button
