const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT; // Usa solo process.env.PORT per Render

// Configura CORS per consentire tutte le origini (temporaneamente)
app.use(cors());
app.use(express.json());

// Importa le rotte
const routes = require('./routes');
app.use('/api', routes); // Configura le rotte sotto "/api"

// Rotta principale per testare il server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Avvio del server sulla porta specificata da Render
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


