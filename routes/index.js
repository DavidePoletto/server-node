const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const shopController = require('../controllers/shopController');
const { getGameDetails } = require('../controllers/getGameDetails');

// Route senza '/api' poiché già aggiunto in server.js
router.get('/news/gaming', newsController.getGamingNews);
router.get('/shop/games', shopController.getShopGames);
router.get('/shop/games/:gameId', getGameDetails);

module.exports = router;

