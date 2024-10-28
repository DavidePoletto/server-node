const axios = require('axios');

exports.getShopGames = async (req, res) => {
  try {
    const params = {
    key: '90736d80468d4a0c956e9428d59f8bbe',
    }

    const response = await axios.get('https://api.rawg.io/api/games', { params });
   
    res.json({
      shop: response.data.results,
    });
  } catch (error) {
    console.error("Errore nella chiamata a RAWG:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};

