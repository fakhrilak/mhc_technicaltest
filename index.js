require('dotenv').config();
const express = require('express');
const router = require('./routes');
const app = express();
const port = process.env.PORT || 5006;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).send({
      message : "Hello this is API MHC TEST"
  })
})

app.use('/api/v1/mhc/', router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})