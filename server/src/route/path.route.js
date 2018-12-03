const paths = require('../controller/path.controller.js');
const modules = require('../controller/module.controller.js');
const checkAuth = require('../middleware/check-auth');

module.exports = (app) => {
  app.get('/path', paths.findAll);
  app.get('/path/:pathId', paths.findOne);
  app.post('/path', checkAuth, paths.create);
  app.post('/path/:pathId/module', checkAuth, modules.create);
  app.delete('/path/:pathId', checkAuth, paths.destroy);
  app.patch('/path/:pathId', checkAuth, paths.update);
};
