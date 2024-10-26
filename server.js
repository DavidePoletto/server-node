const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Configura CORS e JSON
app.use(cors());
app.use(express.json());

// Importa le rotte dal file index.js all'interno della cartella routes
const routes = require('./routes');
app.use('/api', routes); // Questo applica tutte le rotte sotto "/api"


