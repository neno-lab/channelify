require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const webpush = require('web-push');
const path = require('path');
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'web/build')));
}

webpush.setVapidDetails(
  'mailto:test@test.com',
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
