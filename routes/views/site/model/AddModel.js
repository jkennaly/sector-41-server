import m from 'mithril';
import render from 'mithril-node-render';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const template = fs.readFileSync(path.resolve(__dirname, '../shell.html'), 'utf8');

const schemaCache = {};

const handleSubmit = apiModel => (e) => {
  e.preventDefault(); // Prevent form submission
  console.log('submitting form');

  const token = localStorage.getItem("token");
  
  const form = e.target;
  const formData = new FormData(form);
  
  fetch(`/api/${apiModel}/`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    const { id } = data;
    const url = `/site/${apiModel}/${id}`;
    window.location.href = url; // Navigate to the specified URL
  })
  .catch(error => {
    console.error("Error:", error);
    // Handle any errors that occur during the request
  });
};


const generateForm = (schema, data) => {
  return Object.keys(schema.properties).map((prop) => {
    const property = schema.properties[prop];
    const isEnum = property.enum !== undefined;
    const type = isEnum ? 'select' : property.type === 'string' && property.format === 'date-time' ? 'datetime-local' : property.type;

    const options = isEnum ? property.enum : null;
    const labelText = prop[0].toUpperCase() + prop.slice(1).replace(/([A-Z])/g, ' $1');

    return m('.mb-4', [
      m('label.block.text-gray-700.text-sm.font-bold.mb-2', { for: prop }, labelText),
      m(
        type,
        {
          id: prop,
          name: prop,
          required: schema.required.includes(prop),
          value: data[prop],
          onchange: (e) => {
            data[prop] = e.target.value;
          },
          class: 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
          ...(property.type === 'integer' ? { type: 'number', min: property.minimum } : {}),
          ...(property.type === 'string' && property.format === 'date-time' ? { type: 'datetime-local' } : {}),
        },
        options
          ? options.map((opt) =>
              m('option', { value: opt }, opt)
            )
          : null
      ),
    ]);
  });
};

const AddModel = {
  oninit: async (vnode) => {
    const apiModel = vnode.attrs.apiModel;
    if (!schemaCache[apiModel]) {
      const schemaPath = path.resolve(process.cwd(), './schema/', `${apiModel}.schema.json`);
      schemaCache[apiModel] = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    }
  },
  view: (vnode) => {
    const apiModel = vnode.attrs.apiModel;
    const schema = schemaCache[apiModel];
    const data = {};

    return m('form', { onsubmit: handleSubmit(apiModel) }, [
      ...generateForm(schema, data),
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
      ),
    ]);
  },
};

export default function AddModelFactory(options) {
  return async function (req, res, next) {
    const { id } = req.params;
    const { apiModel } = options;
    const html = template.replace(
      '<div id="component"></div>',
      await render(m(AddModel, { id, apiModel }))
    )
    res.locals.html = html;
    next()
  };
}
