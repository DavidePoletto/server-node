const axios = require('axios');

exports.getGamingNews = async (req, res) => {
  try {
    const params = {
      apikey: 'pub_57344223f965b1a800b96279183cd37794130',
      q: 'videogiochi',
      language: 'it',
      category: 'technology',
      size: 10, // Massimo per il piano gratuito
    };

    const response = await axios.get('https://newsdata.io/api/1/news', { params });

    // Aggiungi un'immagine segnaposto agli articoli che ne sono sprovvisti
    const articlesWithPlaceholders = response.data.results.map(article => ({
      ...article,
      image_url: article.image_url || `${req.protocol}://${req.get('host')}/placeholder.png`,
    }));

    res.json({
      articles: articlesWithPlaceholders,
    });
  } catch (error) {
    console.error("Errore nella chiamata a Newsdata.io:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};

