'use strict';

import jose from 'node-jose';

export default async function buildKeystore(app, callback) {
  try {
    const keystore = jose.JWK.createKeyStore();
    await keystore.add(process.env.LOCAL_PUBLIC, 'pem')
    app.set('jwks', keystore.toJSON(true));
  } catch (err) {
    console.log("add JWK failed from PEM key:", err.message);
    throw (err);
  }
  callback();
};
