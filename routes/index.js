const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Rotta per ottenere notizie nerd in italiano
router.get('/news/gaming', newsController.getNerdNews);

module.exports = router;

