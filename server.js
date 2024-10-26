const express = require('express');
const cors = require('cors'); // Assicurati di importare cors
const app = express();
const PORT = process.env.PORT || 5000;

// Configura CORS per consentire le richieste dal tuo frontend
app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware per il parsing JSON
app.use(express.json());

// Importa le rotte
const routes = require('./routes');
app.use('/api', routes); // Configura le rotte sotto "/api"

// Rotta principale per testare il server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
