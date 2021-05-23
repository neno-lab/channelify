const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(user_id) {
  const payload = {
    id: user_id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '3h',
  });
}

module.exports = jwtGenerator;
