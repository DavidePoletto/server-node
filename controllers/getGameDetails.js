
const axios = require('axios');

exports.getGameDetails = async (req, res) => {
  const API_KEY = '4a1bd6afcdf64cc88849b9c47b4d7c56';
  const { gameId } = req.params;

  try {
    const gameDetailsResponse = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
      params: { key: API_KEY },
    });

    const screenshotsResponse = await axios.get(`https://api.rawg.io/api/games/${gameId}/screenshots`, {
      params: { key: API_KEY },
    });

    const gameDetails = gameDetailsResponse.data;
    gameDetails.screenshots = screenshotsResponse.data.results.map(screenshot => screenshot.image);

    res.json(gameDetails);
  } catch (error) {
    console.error("Errore nel recupero dei dettagli del gioco:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};

