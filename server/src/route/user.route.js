const User = require('../controller/user.controller');
const checkAuth = require('../middleware/check-auth');

module.exports = (app) => {
  app.post('/signup', User.signup);
  app.post('/login', User.login);
  app.delete('/:userId', checkAuth, User.delete);
};
