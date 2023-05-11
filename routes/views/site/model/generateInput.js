import m from 'mithril';

function getInputType(schema) {
  switch (schema.type) {
    case 'integer':
    case 'number':
      return 'number';
    case 'boolean':
      return 'checkbox';
    case 'string':
      if (schema.format) {
        switch (schema.format) {
          case 'date-time':
            return 'datetime-local';
          case 'date':
            return 'date';
          case 'time':
            return 'time';
          case 'email':
            return 'email';
          case 'uri':
          case 'uri-reference':
            return 'url';
          case 'ipv4':
          case 'ipv6':
            return 'text'; // no specific input type for IP addresses, using 'text' as fallback
          case 'hostname':
            return 'text'; // no specific input type for hostnames, using 'text' as fallback
        default:
            return 'text';
        }
      }
      return 'text';
    default:
      return 'text';
  }
}

export function generateInput(property, schema) {
  const inputType = getInputType(schema);
  const inputAttributes = {
    type: inputType,
    required: schema.required.includes(property),
    min: schema.type === 'integer' ? schema.properties[property].minimum : undefined,
    max: schema.type === 'integer' ? schema.properties[property].maximum : undefined,
    step: schema.type === 'number' ? schema.properties[property].multipleOf : undefined,
    minLength: schema.type === 'string' ? schema.properties[property].minLength : undefined,
    maxLength: schema.type === 'string' ? schema.properties[property].maxLength : undefined,
    pattern: schema.type === 'string' ? schema.properties[property].pattern : undefined,
    name: property,
    id: property,
  };

  return m('input', inputAttributes);
}
