const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(express.static('public'));

app.use(cors());
app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

