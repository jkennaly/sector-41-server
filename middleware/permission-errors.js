// server/middleware/permission-errors.js

const permissionError = [(err) => /UnauthorizedError/.test(err.message)];

module.exports = function (options) {
  return function logError(err, req, res, next) {
    //check if error is handleable
    const se = permissionError.reduce(
      (garbage, test) => garbage || test(err),
      false
    );
    if (se) {
      res.status(err.statusCode).send(err.code);
      next();
    }
    next(err);
  };
};
