const User = require('../controller/user.controller');

module.exports = (app) => {
  // app.post('/signup', User.signup);
  app.post('/login', User.login);
};
