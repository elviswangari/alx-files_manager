const router = require('express').Router();
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');

router
  .get('/status', AppController.getStatus)
  .get('/stats', AppController.getStats)
  .post('/users', UsersController.postNew);

module.exports = router;
