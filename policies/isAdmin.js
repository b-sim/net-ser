const passport = require('passport');

module.exports = function (req, res, next) {
  if (req.user.email !== 'administration@netblb.com') {
    res.status(403).send({
      error: 'you are not an administrator'
    })
  } else {
    next();
  }
}