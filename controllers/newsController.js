const axios = require('axios');

exports.getGamingNews = async (req, res) => {
  try {
    const nextPage = req.query.nextPage || ''; // Usa `nextPage` se presente, altrimenti inizia dalla prima pagina
    const params = {
      apikey: 'pub_57344223f965b1a800b96279183cd37794130',
      q: 'videogiochi',
      language: 'it',
      category: 'technology',
    };
    if (nextPage) params.page = nextPage; // Usa `nextPage` se disponibile

    const response = await axios.get('https://newsdata.io/api/1/news', { params });
    console.log("Risposta completa dell'API Newsdata:", response.data);

    // Verifica se `results` è un array
    if (!Array.isArray(response.data.results)) {
      throw new Error("Formato dei dati non corretto: 'results' non è un array");
    }

    res.json({
      articles: response.data.results,
      nextPage: response.data.nextPage, // Restituisci `nextPage` se disponibile
    });
  } catch (error) {
    console.error("Errore nella chiamata a Newsdata.io:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};





