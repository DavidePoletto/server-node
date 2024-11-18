const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/profile', (req, res) => {
  const user = { username: 'Test User', email: 'test@example.com' };
  res.json({ user });
});

module.exports = router;
