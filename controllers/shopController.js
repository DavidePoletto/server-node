const axios = require('axios');

exports.getShopGames = async (req, res) => {
  try {
    const API_KEY = '90736d80468d4a0c956e9428d59f8bbe';

    const fetchGamesWithImages = async (params, maxResults = 12) => {
      let games = [];
      let page = 1;

      // Continua a chiamare l'API finché non hai 12 giochi con immagine di copertina
      while (games.length < maxResults) {
        const response = await axios.get(`https://api.rawg.io/api/games`, {
          params: { ...params, key: API_KEY, page_size: 20, page } // page_size aumentato per più risultati
        });

        const filteredGames = response.data.results.filter(game => game.background_image);
        games = games.concat(filteredGames);

        if (response.data.results.length < 20) break; // Se finiscono i risultati, interrompi il ciclo

        page++;
      }

      return games.slice(0, maxResults); // Restituisci solo i primi 12 risultati con immagine
    };

    const trending = await fetchGamesWithImages({ ordering: '-added' });
    const newReleases = await fetchGamesWithImages({ ordering: '-released' });
    const topRated = await fetchGamesWithImages({ ordering: '-rating' });
    const upcoming = await fetchGamesWithImages({ dates: '2024-11-01,2026-12-31', ordering: '-added' });
    const singleplayerGames = await fetchGamesWithImages({ tags: 'singleplayer' });
    const multiplayerGames = await fetchGamesWithImages({ tags: 'multiplayer' });
    const openWorldGames = await fetchGamesWithImages({ tags: 'open-world' });

    res.json({
      trending,
      newReleases,
      topRated,
      upcoming,
      singleplayerGames,
      multiplayerGames,
      openWorldGames
    });
  } catch (error) {
    console.error("Errore nella chiamata a RAWG:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};

