const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Configura CORS per consentire tutte le origini
app.use(cors());

// Middleware per il parsing JSON
app.use(express.json());

// Forza l’intestazione CORS manualmente
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Consente tutte le origini
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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


