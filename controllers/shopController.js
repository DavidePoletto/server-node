const axios = require('axios');
const NodeCache = require('node-cache');

const gameCache = new NodeCache({ stdTTL: 3600 });

exports.getShopGames = async (req, res) => {
  try {
    const API_KEY = '4a1bd6afcdf64cc88849b9c47b4d7c56';


    const fetchGamesWithImages = async (params, maxResults = 9) => {
      let games = [];
      let page = 1;

      while (games.length < maxResults) {
        console.log(`Fetching games for page ${page} with params:`, params);

        const response = await axios.get(`https://api.rawg.io/api/games`, {
          params: { ...params, key: API_KEY, page_size: 20, page },
        });

        const filteredGames = response.data.results.filter((game) => game.background_image);
        games = games.concat(filteredGames);

        if (response.data.results.length < 20) break;
        page++;
      }

      console.log(`Fetched ${games.length} games for params:`, params);
      return games.slice(0, maxResults);
    };

    const fetchScreenshots = async (gameId) => {
      if (gameCache.has(gameId)) {
        console.log(`Cache hit for screenshots of game ID ${gameId}`);
        return gameCache.get(gameId);
      }

      try {
        console.log(`Fetching screenshots for game ID ${gameId}`);
        const response = await axios.get(`https://api.rawg.io/api/games/${gameId}/screenshots`, {
          params: { key: API_KEY, page_size: 3 },
        });

        const screenshots = response.data.results.map((screenshot) => screenshot.image);
        gameCache.set(gameId, screenshots);
        return screenshots;
      } catch (error) {
        console.error(`Errore nel caricamento degli screenshot per il gioco con ID ${gameId}:`, error.message);
        return [];
      }
    };

    const trending = await fetchGamesWithImages({ ordering: '-added' });
    const newReleases = await fetchGamesWithImages({ ordering: '-released' });
    const topRated = (
      await fetchGamesWithImages({ ordering: '-rating' })
    ).filter((game) => !game.tags.some((tag) => tag.slug === 'adult'));
    const upcoming = await fetchGamesWithImages({
      dates: '2024-11-01,2026-12-31',
      ordering: '-added',
    });
    const nintendoGames = await fetchGamesWithImages({ developers: 'nintendo' });
    const multiplayerGames = await fetchGamesWithImages({ tags: 'multiplayer' });

    res.json({
      trending,
      newReleases,
      topRated,
      upcoming,
      nintendoGames,
      multiplayerGames,
    });
  } catch (error) {
    console.error("Errore nella chiamata a RAWG:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};
