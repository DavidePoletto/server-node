// controllers/getGameDetails.js
const axios = require('axios');

exports.getGameDetails = async (req, res) => {
  const API_KEY = '90736d80468d4a0c956e9428d59f8bbe';
  const { gameId } = req.params;

  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
      params: { key: API_KEY },
    });
    res.json(response.data); // Risponde con i dettagli del gioco
  } catch (error) {
    console.error("Errore nel recupero dei dettagli del gioco:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};
