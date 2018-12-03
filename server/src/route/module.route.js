const modules = require('../controller/module.controller');
const checkAuth = require('../middleware/check-auth');

module.exports = (app) => {
  app.get('/module', modules.findAll);
  app.post('/module', checkAuth, modules.create);
  app.delete('/module/:id', checkAuth, modules.destroy);
  app.patch('/module/:id', checkAuth, modules.update);
};
