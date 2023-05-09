// server/middleware/get-user-id.js

import _ from 'lodash';
//const mysql = require('mysql2')

export function getUserId(options) {
  return function (req, res, next) {
    const authId = req.user.sub;
    const aliasTable = req.app.get("aliasTable");
    var foundAlias = aliasTable[authId];
    //console.log('foundAlias ' + foundAlias)
    if (!foundAlias) {
      //get highest id in alias Table
      const highId = _.reduce(
        aliasTable,
        (hi, el) => (el && el > hi ? el : hi),
        0
      );
      //load all aliases with ids higher
      req.conn
        .then((connection) =>
          connection
            .execute("SELECT * FROM `user_aliases` WHERE `id` > '?'", [highId])
            .then(([results, fields]) => {
              const resultPairs = results.map((r) => [r.alias, r.user]);
              _.assign(aliasTable, _.fromPairs(resultPairs));
              if (aliasTable[authId]) {
                req.user.ftUserId = aliasTable[authId];

                //console.log('userId Set A ' + req.user.ftUserId)
              }
              /*
			else {
			  //user not found
			}
			*/
              //console.log('using loaded alias')
              //console.log(req.user)
              next();
            })
        )
        .catch((err) => {
          console.error(
            "get-user-id login error",
            req.user && req.user.ftUserId
          );
          next(err);
        });
      //connection.end()
      //console.log('connected ended ' + req.originalUrl)
    } else {
      req.user.ftUserId = foundAlias;

      //console.log('userId Set B ' + req.user.ftUserId)
      //console.log('using cached alias')
      //console.log(req.user)
      next();
    }
  };
}
