const router = require('express').Router();
const AppController = require('../controllers/AppController');

router.get('/status', AppController.getStatus)
  .get('/stats', AppController.getStats);

module.exports = router;
