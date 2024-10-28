const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const shopController = require('../controllers/shopController')

router.get('/news/gaming', newsController.getGamingNews);
router.get('/shop/games', shopController.getShopGames);

module.exports = router;

