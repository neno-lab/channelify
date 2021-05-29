require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../db');

async function authorization(req, res, next) {
  const authHeader = req.headers.authorization;

  const jwtToken =
    authHeader && authHeader.split(' ')[0] && authHeader.split(' ')[1];

  if (!jwtToken) {
    return res.status(403).json({ message: 'Unauthorized!' });
  }

  try {
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    const user = await db.query('SELECT * FROM users WHERE user_id = $1', [
      payload.id,
    ]);

    req.user = user.rows[0];
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ message: 'Token is invalid or expired!' });
  }

  next();
}

module.exports = authorization;
