require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const webpush = require('web-push');

// middlewares
app.use(express.json());
app.use(cors());

webpush.setVapidDetails(
  'mailto:test@test.com',
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

app.use('/api/v1', router);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
