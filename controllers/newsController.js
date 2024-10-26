const axios = require('axios');

exports.getNerdNews = async (req, res) => {
  try {
    const response = await axios.get('https://newsdata.io/api/1/news', {
      params: {
        apikey: 'pub_57344223f965b1a800b96279183cd37794130', // Inserisci qui la tua chiave API
        language: 'it',
        category: 'entertainment', // Per notizie di intrattenimento
      },
    });

    res.json(response.data.results); // Invia i risultati come risposta
  } catch (error) {
    console.error("Errore nella chiamata a Newsdata.io:", error);
    res.status(500).json({ message: "Errore nella chiamata alle API di Newsdata.io." });
  }
};


