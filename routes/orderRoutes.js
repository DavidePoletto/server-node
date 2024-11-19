const express = require('express');
const { createOrder, getOrders } = require('../controllers/ordersController'); // Assicurati che `getOrders` sia nel controller
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/create', authenticateToken, createOrder);

router.get('/', authenticateToken, getOrders);

module.exports = router;
