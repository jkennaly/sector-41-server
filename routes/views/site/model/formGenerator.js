import m from 'mithril';
import { generateInput } from './generateInput.js';
import { getSchema } from './schemaHandler.js';

function camelCaseToTitleCase(str) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    .trim();
}

function generateSelect(property, schema) {
  return m(
    'select.block.appearance-none.w-full.bg-white.border.border-gray-300.py-2.px-4.pr-8.rounded.leading-tight.focus:outline-none.focus:bg-white.focus:border-gray-500',
    {
      name: property,
      id: property,
      required: schema.required.includes(property),
    },
    schema.properties[property].enum.map((option) => m('option', { value: option }, option))
  );
}

function generatePropertyInput(property, schema) {
  if (schema.properties[property].enum) {
    return generateSelect(property, schema);
  }

  return generateInput(property, schema);
}

function generateFormItem(property, schema) {
  const titleCaseLabel = camelCaseToTitleCase(property);
  return m('.mb-4', [
    m('label.block.text-gray-700.text-sm.font-bold.mb-2', { for: property }, titleCaseLabel),
    generatePropertyInput(property, schema),
  ]);
}

export function generateForm(apiModel) {
  const schema = getSchema(apiModel);

  if (!schema) {
    console.error(`Schema not found for apiModel: ${apiModel}`);
    return m('div', 'Invalid schema or model');
  }

  const userGeneratedProperties = Object.keys(schema.properties).filter(
    (property) => schema.properties[property].generator === 'user'
  ).map((property) => generateFormItem(property, schema));

  const submitButton = m(
    'button',
    {
      type: 'submit',
      class: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
    },
    'Submit'
  )

  const cancelButton = m(
    'button',
    {
      onclick: (e) => {
        e.preventDefault();
        // Add cancel logic here, e.g., navigation or form reset
      },
      class: 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
    },
    'Cancel'
  )


  return m(
    'form.w-full.max-w-lg[method=POST]',
    [
      userGeneratedProperties,
      m(
        'div.flex.items-center.justify-between.mt-6',
        [ 
            submitButton,
            cancelButton
        ]
      )
    ]
  )
  ;
}
