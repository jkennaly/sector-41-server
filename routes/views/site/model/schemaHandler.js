import fs from 'fs';
import path from 'path';

const schemaCache = {};

function readSchemaFromFile(apiModel) {
  const schemaPath = path.join(process.cwd(), 'schema', `${apiModel}.schema.json`);

  if (fs.existsSync(schemaPath)) {
    const rawSchema = fs.readFileSync(schemaPath, 'utf8');
    const schema = JSON.parse(rawSchema);
    schemaCache[apiModel] = schema;
    return schema;
  }

  return null;
}

export function getSchema(apiModel) {
  if (schemaCache[apiModel]) {
    return schemaCache[apiModel];
  }

  return readSchemaFromFile(apiModel);
}
