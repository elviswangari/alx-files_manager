const router = require('express').Router();
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');

router
  .get('/status', AppController.getStatus)
  .get('/stats', AppController.getStats)
  .post('/users', UsersController.postNew)
  .get('/connect', AuthController.getConnect)
  .get('/disconnect', AuthController.getDisconnect)
  .get('/users/me', UsersController.getMe);

module.exports = router;
