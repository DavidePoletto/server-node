const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)


.then(() => console.log(`Connesso al database: ${process.env.MONGO_URI}`))
.catch((err) => console.error('Errore connessione MongoDB:', err));

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const authRoutes = require('./routes/authRoutes');
const generalRoutes = require('./routes');

app.use('/api/auth', authRoutes);
app.use('/api', generalRoutes);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
