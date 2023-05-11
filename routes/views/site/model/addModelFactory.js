import m from 'mithril';
import render from 'mithril-node-render';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { generateForm } from './formGenerator.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const template = fs.readFileSync(path.resolve(__dirname, '../shell.html'), 'utf8');

const AddModel = {
  view: (vnode) => {
    const { apiModel } = vnode.attrs;

    return generateForm(apiModel);
  },
};

export default function AddModelFactory(options = {}) {
  return async function (req, res, next) {
    const { apiModel } = options;
    const html = template.replace(
      '<div id="component"></div>',
      await render(m(AddModel, { apiModel }))
    );
    res.locals.html = html;
    next();
  };
}
