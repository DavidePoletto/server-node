const axios = require('axios');

exports.getGamingNews = async (req, res) => {
  try {
    const params = {
      apikey: 'pub_57344223f965b1a800b96279183cd37794130',
      q: 'videogiochi',         // Query di ricerca
      language: 'it',           // Lingua italiana
      category: 'technology',   // Categoria di tecnologia
      size: 10                  // Richiedi il massimo degli articoli consentiti
    };

    const response = await axios.get('https://newsdata.io/api/1/news', { params });

    // Aggiungi un'immagine segnaposto agli articoli senza immagine
    const articlesWithPlaceholders = response.data.results.map(article => ({
      ...article,
      image_url: article.image_url || `${req.protocol}://${req.get('host')}/placeholder.png`
    }));

    res.json({
      articles: articlesWithPlaceholders,
    });
  } catch (error) {
    console.error("Errore nella chiamata a Newsdata.io:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: error.response ? error.response.data : error.message });
  }
};

