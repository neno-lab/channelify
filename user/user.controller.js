const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const db = require('../db');
const webpush = require('web-push');

async function register(req, res) {
  const { first_name, last_name, email, password } = req.body;

  const user = await db.query('SELECT * FROM users WHERE user_email = $1', [
    email,
  ]);

  if (user.rows.length !== 0) {
    return res
      .status(401)
      .json({ message: 'User already exists with that email.' });
  }

  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);

  const bcryptPassword = await bcrypt.hash(password, salt);

  const newUser = await db.query(
    'INSERT INTO users (user_first_name, user_last_name, user_email, user_password) VALUES ($1, $2, $3, $4) RETURNING *',
    [first_name, last_name, email, bcryptPassword]
  );

  const token = jwtGenerator(newUser.rows[0].user_id);

  const data = newUser.rows[0];

  return res.status(200).json({
    success: true,
    message: 'User is registered.',
    user: {
      user_id: data.user_id,
      first_name: data.user_first_name,
      last_name: data.user_last_name,
      email: data.user_email,
      password: data.user_password,
      location: data.user_location,
      endpoint: data.user_endpoint,
      auth: data.user_auth,
      p256dh: data.user_p256dh,
      tv_channel_id_fk: data.tv_channel_id_fk,
    },
    token,
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await db.query('SELECT * FROM users WHERE user_email = $1', [
    email,
  ]);

  if (user.rows.length === 0) {
    return res.status(401).json({ message: 'Password or Email is incorrect' });
  }

  const validPassword = await bcrypt.compare(
    password,
    user.rows[0].user_password
  );

  if (!validPassword) {
    return res.status(401).json({ message: 'Password or Email is incorrect' });
  }

  const token = jwtGenerator(user.rows[0].user_id);

  const data = user.rows[0];

  return res.status(200).json({
    success: true,
    message: 'User is logged in.',
    user: {
      user_id: data.user_id,
      first_name: data.user_first_name,
      last_name: data.user_last_name,
      email: data.user_email,
      password: data.user_password,
      location: data.user_location,
      endpoint: data.user_endpoint,
      auth: data.user_auth,
      p256dh: data.user_p256dh,
      tv_channel_id_fk: data.tv_channel_id_fk,
    },
    token,
  });
}

async function updateLocation(req, res) {
  const { location } = req.body;

  const result_location = await db.query(
    'UPDATE users SET user_location = $1 WHERE user_id = $2 RETURNING *',
    [location, req.params.id]
  );

  if (result_location.rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'That user does not exist.',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'User location updated.',
  });
}

async function getSingleUserData(req, res) {
  const result_single_user_data = await db.query(
    'SELECT * FROM users WHERE user_id = $1',
    [req.params.id]
  );

  if (result_single_user_data.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'That user does not exist.',
    });
  }

  const data = result_single_user_data.rows[0];

  res.status(200).json({
    success: true,
    user: {
      user_id: data.user_id,
      first_name: data.user_first_name,
      last_name: data.user_last_name,
      email: data.user_email,
      password: data.user_password,
      location: data.user_location,
      endpoint: data.user_endpoint,
      auth: data.user_auth,
      p256dh: data.user_p256dh,
      tv_channel_id_fk: data.tv_channel_id_fk,
    },
  });
}

async function saveSubscription(req, res) {
  const { newSub } = req.body;

  const result_subscription = await db.query(
    'UPDATE users SET user_endpoint = $1, user_auth = $2, user_p256dh = $3 WHERE user_id = $4 RETURNING *',
    [newSub.endpoint, newSub.keys.auth, newSub.keys.p256dh, req.params.id]
  );

  if (result_subscription.rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'That user does not exist.',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Subscription saved',
  });
}

async function sendNotification(req, res) {
  const data = await db.query(
    'SELECT user_endpoint, user_auth, user_p256dh FROM users WHERE NOT user_id = $1 AND user_location = $2 AND tv_channel_id_fk is null',
    [req.params.id, req.params.location]
  );

  const payload = JSON.stringify({
    title: req.params.name,
    content: 'Are you watching the TV?',
  });

  if (data.rows.length !== 0) {
    data.rows.forEach((subscription) => {
      webpush
        .sendNotification(
          {
            endpoint: subscription.user_endpoint,
            keys: {
              auth: subscription.user_auth,
              p256dh: subscription.user_p256dh,
            },
          },
          payload
        )
        .catch((err) => {
          console.error(err);
        });
    });
    res.status(200).json({
      success: true,
      message: 'Message sent.',
    });
  } else {
    res.status(200).json({
      success: true,
      message: 'Message is not sent.',
    });
  }
}

async function countUsers(req, res) {
  console.log('ALO BRE E BRE');

  return res.status(200).json({
    success: true,
  });
}

module.exports = {
  register,
  login,
  updateLocation,
  saveSubscription,
  sendNotification,
  getSingleUserData,
  countUsers,
};
