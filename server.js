const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI)


.then(() => console.log(`Connesso al database: ${process.env.MONGO_URI}`))
.catch((err) => console.error('Errore connessione MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rotte
const authRoutes = require('./routes/authRoutes');
const generalRoutes = require('./routes');

app.use('/api/auth', authRoutes);
app.use('/api', generalRoutes);

// Rotta di test
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
