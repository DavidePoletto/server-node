const axios = require('axios');

// Funzione per ottenere le notizie da GamerPower
exports.getNews = async (req, res) => {
  try {
    const response = await axios.get('https://www.gamerpower.com/api/giveaways');
    res.json(response.data);
  } catch (error) {
    console.error("Errore nella chiamata a GamerPower:", error);
    res.status(500).json({ message: "Errore nella chiamata alle API di GamerPower." });
  }
};

