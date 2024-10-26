const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Definisci un endpoint (sostituisci il percorso con quello che preferisci)
app.get('/api/giveaways', async (req, res) => {
  try {
    // Esempio di chiamata a GamerPower API per ottenere giveaway
    const response = await axios.get('https://www.gamerpower.com/api/giveaways');
    res.json(response.data); // Rispondi con i dati ottenuti dall'API
  } catch (error) {
    console.error("Errore nella chiamata API:", error);
    res.status(500).json({ message: "Errore nella chiamata API" });
  }
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
