const axios = require('axios');

exports.getGamingNews = async (req, res) => {
  try {
    const params = {
      apikey: 'pub_57344223f965b1a800b96279183cd37794130',
      q: 'videogiochi',
      language: 'it',
      category: 'technology',
      size: 10, // Imposta il numero massimo di articoli per richiesta
    };

    const response = await axios.get('https://newsdata.io/api/1/news', { params });

    // Filtra gli articoli per includere solo quelli con immagine di copertina
    const articlesWithImages = response.data.results.filter(article => article.image_url);

    res.json({
      articles: articlesWithImages, // Invia solo articoli con immagine
    });
  } catch (error) {
    console.error("Errore nella chiamata a Newsdata.io:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};
