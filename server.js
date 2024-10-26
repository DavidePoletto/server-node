const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Configura CORS per consentire tutte le origini temporaneamente
app.use(cors()); 

// Middleware per il parsing JSON
app.use(express.json());

// Importa le rotte
const routes = require('./routes');
app.use('/api', routes);

// Rotta principale per testare il server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

