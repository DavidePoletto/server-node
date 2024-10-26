const axios = require('axios');

exports.getGamingNews = async (req, res) => {
  try {
    const nextPage = req.query.nextPage || ''; // Prendi il valore di nextPage dalla richiesta, o usa una stringa vuota
    const response = await axios.get('https://newsdata.io/api/1/news', {
      params: {
        apikey: 'pub_57344223f965b1a800b96279183cd37794130',
        q: 'videogiochi',
        language: 'it',
        category: 'technology',
        page: nextPage,
      },
    });

    // Restituisci i dati e il parametro `nextPage`
    res.json({
      articles: response.data.results,
      nextPage: response.data.nextPage,
    });
  } catch (error) {
    console.error("Errore nella chiamata a Newsdata.io:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};




