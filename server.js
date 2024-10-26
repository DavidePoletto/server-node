const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Abilita il CORS per tutte le richieste
app.use(express.json()); // Parsing JSON per le richieste

// Rotte
const routes = require('./routes'); // Importa le tue rotte
app.use('/api', routes); // Tutte le API risponderanno sotto "/api"

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});