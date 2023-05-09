// server/middleware/handle-errors.js

const errorHandles = [
  {
    handle: /MODEL_NOT_FOUND/,
    action: (res) => res.status(404),
  },
];

const garbageInput = [
  (err) => /MODEL_NOT_FOUND/.test(err.code),
  (err) => /Value\sis\snot\san\sobject/.test(err.message),
  (err) => /id\sproperty\s\(id\)\scannot\sbe\supdated/.test(err.message),
  (err) => /instance\sis\snot\svalid/.test(err.message),
  (err) => /Cannot\smodify\sthis\sresource/.test(err.message),
  (err) => /MalformedRequestError/.test(err.message),
  (err) => /ER_DUP_ENTRY/.test(err.message),
  (err) => /No\sdata\ssupplied/.test(err.message),
  (err) => /No\sPurchased\sEvents/.test(err.message),
  (err) => /Open\sRequest\sPending/.test(err.message),
  (err) => /No\sbase\sMessage/.test(err.message),
  (err) => /refresh\sunavailable/.test(err.message),
  (err) => /id\scannot\sbe updated\sfrom\s0\sto/.test(err.message),
];

module.exports = function (options) {
  return function logError(err, req, res, next) {
    //check if error is handleable
    const gi = garbageInput.reduce(
      (garbage, test) => garbage || test(err),
      false
    );
    if (gi) {
      res.status(err.statusCode).send(err.code);
      return;
    }
    console.log("err keys", Object.keys(err), err.message);
    console.log("unhandled error", err);
    next(err);
  };
};
