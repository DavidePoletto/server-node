const axios = require('axios');

exports.getGamingNews = async (req, res) => {
  try {
    const params = {
      apikey: 'pub_57344223f965b1a800b96279183cd37794130',
      q: 'videogiochi',
      language: 'it',
      category: 'technology',
      page_size: 10, // Prima richiesta per 10 articoli
    };

    // Prima richiesta per ottenere 10 articoli
    const firstResponse = await axios.get('https://newsdata.io/api/1/news', { params });
    const articles = firstResponse.data.results;

    // Seconda richiesta per ottenere 7 articoli aggiuntivi, utilizzando `nextPage` dalla prima risposta
    const nextPage = firstResponse.data.nextPage;
    if (nextPage) {
      const secondResponse = await axios.get('https://newsdata.io/api/1/news', {
        params: {
          ...params,
          page: nextPage,
          page_size: 7, // Ottieni solo 7 articoli
        },
      });
      articles.push(...secondResponse.data.results);
    }

    // Invia esattamente 17 articoli al frontend
    res.json({
      articles,
    });
  } catch (error) {
    console.error("Errore nella chiamata a Newsdata.io:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};






