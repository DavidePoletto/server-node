const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Estrai l'header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Log per debug
    console.log('Token ricevuto:', token);

    // Se non esiste un token
    if (!token) {
      console.error('Accesso negato: Token mancante');
      return res.status(401).json({ message: 'Accesso negato. Token mancante.' });
    }

    // Verifica e decodifica il token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log per debug
    console.log('Token decodificato:', decoded);

    // Associa l'utente autenticato alla richiesta
    req.user = decoded;

    // Passa al prossimo middleware
    next();
  } catch (error) {
    // Messaggi di errore più chiari
    console.error('Errore nella verifica del token:', error.message);
    const statusCode = error.name === 'TokenExpiredError' ? 401 : 403;
    res.status(statusCode).json({ message: 'Token non valido o scaduto.' });
  }
};
