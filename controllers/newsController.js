const axios = require('axios');

exports.getGamingNews = async (req, res) => {
  try {
    const nextPage = req.query.nextPage || ''; // Imposta pagina iniziale se `nextPage` è vuoto
    const params = {
      apikey: 'pub_57344223f965b1a800b96279183cd37794130',
      q: 'videogiochi',
      language: 'it',
      category: 'technology',
    };
    if (nextPage) params.page = nextPage; // Aggiungi solo se presente

    const response = await axios.get('https://newsdata.io/api/1/news', { params });

    res.json({
      articles: response.data.results,
      nextPage: response.data.nextPage, // Invia `nextPage` per il prossimo caricamento
    });
  } catch (error) {
    console.error("Errore nella chiamata a Newsdata.io:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};






