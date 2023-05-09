// server/middleware/stripe-errors.js

const stripeError = [(err) => /Stripe.*Error/.test(err.message)];

module.exports = function (options) {
  return function logError(err, req, res, next) {
    //check if error is handleable
    const se = stripeError.reduce(
      (garbage, test) => garbage || test(err),
      false
    );
    if (se) {
      console.trace(err);
      res.status(err.statusCode).send(err.code);
      if (!/MalformedRequest/.test(err.message)) {
        console.trace(err);
        return;
      }
      next();
    }
    next(err);
  };
};
