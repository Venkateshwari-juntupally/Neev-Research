// server/app.js
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const candidatesRouter = require('./candidates');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Use the candidates routes
app.use('/candidates', candidatesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
