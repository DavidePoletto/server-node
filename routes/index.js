const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Rotta per ottenere notizie sul mondo dei videogiochi
router.get('/news/gaming', newsController.getGamingNews);

module.exports = router;

