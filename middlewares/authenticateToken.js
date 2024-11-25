const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('Token ricevuto:', token);

    if (!token) {
      console.error('Accesso negato: Token mancante');
      return res.status(401).json({ message: 'Accesso negato. Token mancante.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Token decodificato:', decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.error('Errore nella verifica del token:', error.message);
    const statusCode = error.name === 'TokenExpiredError' ? 401 : 403;
    res.status(statusCode).json({ message: 'Token non valido o scaduto.' });
  }
};
