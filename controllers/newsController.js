const axios = require('axios');

exports.getGamingNews = async (req, res) => {
  try {
    const response = await axios.get('https://newsdata.io/api/1/news', {
      params: {
        apikey: 'pub_57344223f965b1a800b96279183cd37794130', // La tua chiave API
        q: 'videogiochi', 
        language: 'it',   
        category: 'technology',
      },
    });

    res.json(response.data.results); 
  } catch (error) {
    console.error("Errore nella chiamata a Newsdata.io:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Errore nella chiamata alle API di Newsdata.io." });
  }
};


