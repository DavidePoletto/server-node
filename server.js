const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/gamerpower/news', async (req, res) => {
  try {
    const response = await axios.get('https://www.gamerpower.com/api/giveaways');
    res.json(response.data);
  } catch (error) {
    console.error("Errore nella chiamata API:", error);
    res.status(500).json({ message: "Errore nella chiamata API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
