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

      // Aggiungi gli screenshot per ogni gioco
      const gamesWithScreenshots = await Promise.all(games.slice(0, maxResults).map(async (game) => {
        const screenshots = await fetchScreenshots(game.id);
        return { ...game, screenshots }; // Aggiungi gli screenshot al gioco
      }));

      return gamesWithScreenshots;
    };

    // Funzione per ottenere gli screenshot di un gioco specifico
    const fetchScreenshots = async (gameId) => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games/${gameId}/screenshots`, {
          params: { key: API_KEY }
        });
        return response.data.results.map(screenshot => screenshot.image);
      } catch (error) {
        console.error(`Errore nel caricamento degli screenshot per il gioco con ID ${gameId}:`, error.message);
        return []; // Restituisci un array vuoto se ci sono errori
      }
    };

    const trending = await fetchGamesWithImages({ ordering: '-added' });
    const newReleases = await fetchGamesWithImages({ ordering: '-released' });
    const topRated = await fetchGamesWithImages({ ordering: '-rating' });
    const upcoming = await fetchGamesWithImages({ dates: '2024-11-01,2026-12-31', ordering: '-added' });
    const singleplayerGames = await fetchGamesWithImages({ tags: 'rpg' });
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
