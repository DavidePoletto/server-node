const axios = require('axios');

exports.getGamingNews = async (req, res) => {
  try {
    const nextPage = req.query.nextPage || ''; // Utilizza pagina iniziale se nextPage è vuoto
    const params = {
      apikey: 'pub_57344223f965b1a800b96279183cd37794130',
      q: 'videogiochi',
      language: 'it',
      category: 'technology',
    };
    if (nextPage) params.page = nextPage; // Aggiungi page solo se nextPage è presente

    const response = await axios.get('https://newsdata.io/api/1/news', { params });

    // Filtra gli articoli per includere solo quelli con immagine di copertina
    const articlesWithImages = response.data.results.filter(article => article.image_url);

    res.json({
      articles: articlesWithImages, // Invia solo articoli con immagine
      nextPage: response.data.nextPage, // Invia nextPage per il prossimo caricamento
    });
  } catch (error) {
    console.error("Errore nella chiamata a Newsdata.io:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};
