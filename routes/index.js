const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const shopController = require('../controllers/shopController')
const { getGameDetails } = require('.,./controllers/getGameDetails');

router.get('/news/gaming', newsController.getGamingNews);
router.get('/shop/games', shopController.getShopGames);
router.get('/api/shop/games/:gameId', getGameDetails);

module.exports = router;

