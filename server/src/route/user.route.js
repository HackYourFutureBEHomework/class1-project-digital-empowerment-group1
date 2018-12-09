const User = require('../controller/user.controller');

module.exports = (app) => {
  app.post('/login', User.login);
};
