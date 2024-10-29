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

    const upcomingResponse = await axios.get(`https://api.rawg.io/api/games`, {
      params: { key: API_KEY, dates: '2024-01-01,2024-12-31', ordering: '-added', page_size: 12 }
    });

    const indieGamesResponse = await axios.get(`https://api.rawg.io/api/games`, {
      params: { key: API_KEY, tags: 'indie', page_size: 12 }
    });

    const multiplayerGamesResponse = await axios.get(`https://api.rawg.io/api/games`, {
      params: { key: API_KEY, tags: 'multiplayer', page_size: 12 }
    });

    const openWorldGamesResponse = await axios.get(`https://api.rawg.io/api/games`, {
      params: { key: API_KEY, tags: 'open-world', page_size: 12 }
    });

    // Filtra i giochi per includere solo quelli con un'immagine di copertina
    const filterWithImage = (games) => games.filter(game => game.background_image);

    res.json({
      trending: filterWithImage(trendingResponse.data.results),
      newReleases: filterWithImage(newReleasesResponse.data.results),
      topRated: filterWithImage(topRatedResponse.data.results),
      upcoming: filterWithImage(upcomingResponse.data.results),
      indieGames: filterWithImage(indieGamesResponse.data.results),
      multiplayerGames: filterWithImage(multiplayerGamesResponse.data.results),
      openWorldGames: filterWithImage(openWorldGamesResponse.data.results)
    });
  } catch (error) {
    console.error("Errore nella chiamata a RAWG:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};
