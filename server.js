const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Abilita il CORS per tutte le richieste
app.use(express.json()); // Parsing JSON per le richieste

// Importa le rotte
const routes = require('./routes'); 
app.use('/api', routes); // Tutte le API risponderanno sotto "/api"

// Rotta principale per verificare il funzionamento del server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
