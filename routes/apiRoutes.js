const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const AppController = require('../controllers/appController')();
  const InventoryController = require('../controllers/inventoryController')(db,AuthController);
  const TagsController = require('../controllers/tagsController')(db);
  // Authentication
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // App
  router.get('/data', ensureAuthenticated, AppController.getData);
  // Iventory
  router.post('/inventory', InventoryController.createItem);
  router.put('/inventory/:id', InventoryController.updateItem);
  router.get('/inventory/search/:query?', InventoryController.search);
  router.get('/inventory/:id', InventoryController.findOne);
  router.delete('/inventory/:id',InventoryController.deleteItem);
  // Tags
  router.get('/tags/:query?', TagsController.searchTags);
  router.post('/tags/:id', TagsController.addTag);
  router.put('/tags/:id', TagsController.updateTags);
  return router;
};
