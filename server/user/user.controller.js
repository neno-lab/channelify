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

// async function getAllUsersExceptOne(req, res) {
//   const allUsers = await db.query(
//     'SELECT user_id, user_first_name, user_last_name, user_location, tv_channel_id_fk FROM users WHERE user_id NOT IN ($1)',
//     [req.params.id]
//   );

//   return res.status(200).json({
//     success: true,
//     users: allUsers.rows,
//   });
// }

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

async function updateNotification(req, res) {
  const { notification } = req.body;

  const result_notification = await db.query(
    'UPDATE users SET user_notification_watching = $1 WHERE user_id = $2 RETURNING *',
    [notification, req.params.id]
  );

  if (result_notification.rows.length === 0) {
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

async function saveSubscription(req, res) {
  const { newSub } = req.body;

  console.log('New Sub: ', newSub);

  // const payload = JSON.stringify({ title: 'Push Test' });

  // console.log('MRALE: ', subscription);
  // console.log('SAIBABA: ', payload);

  // webpush
  //   .sendNotification(subscription, payload)
  //   .catch((err) => console.error(err));

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

module.exports = {
  register,
  login,
  //   getAllUsersExceptOne,
  updateLocation,
  updateNotification,
  saveSubscription,
};
