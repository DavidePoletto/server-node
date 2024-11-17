const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rotta per registrazione
router.post('/register', register);

// Rotta per login
router.post('/login', login);

router.get('/profile', authMiddleware, (req, res) => {
    res.json({ user: req.user });
  });

module.exports = router;
