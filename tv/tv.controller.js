const db = require('../db');

async function getAllTvChannels(req, res) {
  const allTvChannels = await db.query(
    'SELECT * FROM tv_channels LEFT JOIN (SELECT tv_channel_id_fk, COUNT(tv_channel_id_fk) AS amount FROM users GROUP BY tv_channel_id_fk) users ON tv_channels.tv_channel_id = users.tv_channel_id_fk;'
  );

  return res.status(200).json({
    success: true,
    tv_channels: allTvChannels.rows,
  });
}

async function updateTvChannel(req, res) {
  const { tv_channel } = req.body;

  const result_tv_channel = await db.query(
    'UPDATE users SET tv_channel_id_fk = $1 WHERE user_id = $2 RETURNING *',
    [tv_channel, req.params.id]
  );

  if (result_tv_channel.rowCount === 0) {
    return res.status(404).json({
      success: false,
      message: 'That user does not exist.',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Watching TV channel updated.',
  });
}

module.exports = {
  getAllTvChannels,
  updateTvChannel,
};
