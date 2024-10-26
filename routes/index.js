const express = require('express');
const router = express.Router();
const gamerPowerController = require('../controllers/gamerPowerController');

// Definisci la rotta per ottenere le notizie da GamerPower
router.get('/gamerpower/news', gamerPowerController.getNews);

module.exports = router;

