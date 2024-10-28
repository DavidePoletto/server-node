const axios = require('axios');

exports.getShopGames = async (req, res) => {
  try {
    const API_KEY = '90736d80468d4a0c956e9428d59f8bbe';
    
    const trendingResponse = await axios.get(`https://api.rawg.io/api/games`, {
      params: { key: API_KEY, ordering: '-added', page_size: 12 }
    });
    
    const newReleasesResponse = await axios.get(`https://api.rawg.io/api/games`, {
      params: { key: API_KEY, ordering: '-released', page_size: 12 }
    });
    
    const topRatedResponse = await axios.get(`https://api.rawg.io/api/games`, {
      params: { key: API_KEY, ordering: '-rating', page_size: 12 }
    });

    res.json({
      trending: trendingResponse.data.results,
      newReleases: newReleasesResponse.data.results,
      topRated: topRatedResponse.data.results,
    });
  } catch (error) {
    console.error("Errore nella chiamata a RAWG:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};


