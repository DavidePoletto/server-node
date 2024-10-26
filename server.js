const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Abilita CORS per consentire al frontend di accedere alle risorse
app.use(cors());
app.use(express.json());

// Endpoint per la chiamata API (es. GamerPower)
app.get('/api/gamerpower/news', async (req, res) => {
  try {
    const response = await axios.get('https://www.gamerpower.com/api/giveaways');
    res.json(response.data);
  } catch (error) {
    console.error("Errore nella chiamata API:", error);
    res.status(500).json({ message: "Errore nella chiamata API" });
  }
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
