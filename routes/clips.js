const express = require('express');
const router = express.Router();
const clipsCtrl = require('../controllers/clips');
const isLoggedIn = require('../config/auth');

router.get('/', clipsCtrl.index);
// Use isLoggedIn middleware to protect routes
router.get('/new', isLoggedIn, clipsCtrl.new);
router.get('/:id', clipsCtrl.show);
router.post('/', isLoggedIn, clipsCtrl.create);

module.exports = router;