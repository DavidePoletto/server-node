const axios = require('axios');

exports.getShopGames = async (req, res) => {
  try {
    const API_KEY = '007a6c13f1af4bae93971d2762e64cf9';

    // Funzione per ottenere i giochi con immagini e aggiungere gli screenshot
    const fetchGamesWithImages = async (params, maxResults = 12) => {
      let games = [];
      let page = 1;

      // Continua a richiedere giochi finché non si raggiunge il numero desiderato
      while (games.length < maxResults) {
        const response = await axios.get(`https://api.rawg.io/api/games`, {
          params: { ...params, key: API_KEY, page_size: 20, page }
        });

        const filteredGames = response.data.results.filter(game => game.background_image);
        games = games.concat(filteredGames);

        if (response.data.results.length < 20) break; // Interrompi se non ci sono più risultati
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
        return []; // Restituisci un array vuoto se c'è un errore
      }
    };

    // Categorie di giochi da richiedere
    const trending = await fetchGamesWithImages({ ordering: '-added' });
    const newReleases = await fetchGamesWithImages({ ordering: '-released' });
    const topRated = (await fetchGamesWithImages({ ordering: '-rating' })).filter(
      game => !game.tags.some(tag => tag.slug === 'adult')
    );
    const upcoming = await fetchGamesWithImages({ dates: '2024-11-01,2026-12-31', ordering: '-added' });
    const nintendoGames = await fetchGamesWithImages({
      developers: '103', // ID di Nintendo come sviluppatore
    });
    const multiplayerGames = await fetchGamesWithImages({ tags: 'multiplayer' });

    // Risposta con tutte le categorie e i rispettivi giochi
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
