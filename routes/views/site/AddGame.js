import m from 'mithril';
import render from 'mithril-node-render';
import Games from '../../../models/Games.js';

import fs from 'fs';
import path from "path"
import url from 'url';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const template = fs.readFileSync(path.resolve(__dirname, './shell.html'), 'utf8')

const emptyGame = {
  name: '',
  status: '',
  completedAt: '',
  maxPlayers: '',
  gameLength: '',
  gameType: ''
}

const handleSubmit = (e, game) => {
  e.preventDefault();
  // Add client-side validation here
}

const AddGame = {
  view: (vnode) => {
    const game = emptyGame;
    const id = vnode.attrs.gameId;
    console.log('AddGame', id, vnode);
    return m('form', { onsubmit: (e) => handleSubmit(e, game) }, [
      Object.keys(game).map((prop) => {
        const isEnum = Array.isArray(Games.rawAttributes[prop].type.values);
        const type = isEnum ? 'select' : 'input';
        const options = isEnum ? Games.rawAttributes[prop].type.values : null;
        const labelText = prop[0].toUpperCase() + prop.slice(1).replace(/([A-Z])/g, ' $1');
        return m('.mb-4', [
          m('label.block.text-gray-700.text-sm.font-bold.mb-2', { for: prop }, labelText),
          m(
            type,
            {
              id: prop,
              name: prop,
              required: true,
              value: game[prop],
              onchange: (e) => {
                game[prop] = e.target.value;
              },
              class: 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
              ...(prop === 'completedAt' ? { type: 'date' } : {}),
              ...(prop === 'maxPlayers' || prop === 'gameLength' ? { type: 'number', min: 1 } : {}),
            },
            options
              ? options.map((opt) =>
                  m('option', { value: opt }, opt)
                )
              : null
          )
        ]);
      }),
      m(
        '.flex.items-center.justify-between.mt-8',
        m(
          'button',
          {
            type: 'submit',
            class: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
          },
          'Submit'
        ),
        m(
          m.route.Link,
          {
            href: '/',
            class: 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
          },
          'Cancel'
        )
      )
    ]);
  }
};

export default function AddGameFactory() {
  return async function(req, res, next) {
    const { gameId } = req.params;
    const html = template.replace(
      '<div id="component"></div>',
      await render(m(AddGame, { gameId }))
    )
    res.locals.html = html;
    next()
  };
}
