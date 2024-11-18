const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Rotta per registrazione
router.post('/register', register);

// Rotta per login
router.post('/login', login);

// Rotta per il profilo utente (senza autenticazione per il momento)
router.get('/profile', (req, res) => {
  // Verifica se l'utente è loggato. In questo caso, restituiremo un profilo finto.
  const user = { username: 'Test User', email: 'test@example.com' };
  res.json({ user });
});

module.exports = router;
