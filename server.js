const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(cors());
app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


