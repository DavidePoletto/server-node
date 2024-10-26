const axios = require('axios');

// Funzione per ottenere notizie e aggiornamenti da GamerPower
exports.getNews = async (req, res) => {
  try {
    const response = await axios.get('https://www.gamerpower.com/api/giveaways'); // URL delle API di GamerPower
    res.json(response.data); // Invia i dati ricevuti come risposta alla richiesta
  } catch (error) {
    console.error("Errore nella chiamata a GamerPower:", error);
    res.status(500).json({ message: "Errore nella chiamata alle API di GamerPower." });
  }
};
