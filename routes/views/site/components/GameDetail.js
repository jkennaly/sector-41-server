import m from 'mithril'

const GameDetail = {
  view: function(vnode) {
    const game = vnode.attrs.game;
    return (
      m('div', { class: 'p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4' }, [
        m('div', { class: 'flex-shrink-0' }, [
          m('img', { class: 'h-12 w-12', src: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png', alt: 'React.js logo' })
        ]),
        m('div', [
          m('div', { class: 'text-xl font-medium text-black' }, game.name),
          m('div', { class: 'text-xl font-medium text-gray-500' }, game.status),
          m('div', { class: 'text-xl font-medium text-gray-500' }, `Max Players: ${game.maxPlayers}`),
          m('div', { class: 'text-xl font-medium text-gray-500' }, `Game Length: ${game.gameLength} minutes`),
          m('div', { class: 'text-xl font-medium text-gray-500' }, `Game Type: ${game.gameType}`),
          m('div', { class: 'text-xl font-medium text-gray-500' }, `Completed At: ${game.completedAt}`)
        ])
      ])
    );
  }
};

export default GameDetail;