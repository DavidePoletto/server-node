const express = require('express');
const router = express.Router();
const gamerPowerController = require('../controllers/gamerPowerController');

// Rotta per ottenere le notizie da GamerPower
router.get('/gamerpower/news', gamerPowerController.getNews);

module.exports = router;
