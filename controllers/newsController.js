const axios = require('axios');

exports.getGamingNews = async (req, res) => {
  try {
    const nextPage = req.query.nextPage || ''; // Usa il valore di `nextPage` se fornito
    const params = {
      apikey: 'pub_57344223f965b1a800b96279183cd37794130',
      q: 'videogiochi',
      language: 'it',
      category: 'technology',
      page: nextPage,
      page_size: 10, // Imposta il numero di articoli per pagina
    };

    const response = await axios.get('https://newsdata.io/api/1/news', { params });

    // Invia gli articoli e il parametro `nextPage` per la richiesta successiva
    res.json({
      articles: response.data.results,
      nextPage: response.data.nextPage, // Invia `nextPage` per la prossima richiesta
    });
  } catch (error) {
    console.error("Errore nella chiamata a Newsdata.io:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};






