import m from 'mithril';

const GameListView = {
    view: function(vnode) {
      const games = vnode.attrs.games;
  
      return m('div', { class: 'p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md' }, [
        m('div', { class: 'flex justify-between items-center mb-6' }, [
          m('div', { class: 'text-2xl font-bold text-black' }, 'Game List'),
          m('button', { class: 'px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none' }, 'Create New Game')
        ]),
        m('table', { class: 'w-full' }, [
          m('thead', [
            m('tr', [
              m('th', { class: 'px-4 py-2 text-left' }, 'Game Name'),
              m('th', { class: 'px-4 py-2 text-left' }, 'Status'),
              m('th', { class: 'px-4 py-2 text-left' }, 'Max Players'),
              m('th', { class: 'px-4 py-2 text-left' }, 'Game Length'),
              m('th', { class: 'px-4 py-2 text-left' }, 'Game Type'),
              m('th', { class: 'px-4 py-2 text-left' })
            ])
          ]),
          m('tbody', games.map(function(game) {
            return m('tr', [
              m('td', { class: 'px-4 py-2' }, game.name),
              m('td', { class: 'px-4 py-2' }, game.status),
              m('td', { class: 'px-4 py-2' }, game.maxPlayers),
              m('td', { class: 'px-4 py-2' }, game.gameLength),
              m('td', { class: 'px-4 py-2' }, game.gameType),
              m('td', { class: 'px-4 py-2' }, [
                m('button', { class: 'px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none' }, 'Join Game')
              ])
            ]);
          }))
        ])
      ]);
    }
  };

  export default GameListView;