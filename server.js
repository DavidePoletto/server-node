const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Configura CORS per consentire le richieste dal tuo frontend
const corsOptions = {
  origin: 'http://localhost:5173', // L’URL del tuo frontend in locale
};
app.use(cors(corsOptions)); // Applica CORS con le opzioni configurate

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
