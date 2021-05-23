CREATE DATABASE diplomski;

CREATE TABLE tv_channels(
    tv_channel_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    tv_channel_name VARCHAR(200) NOT NULL
);

CREATE TABLE tv_channels(
    tv_channel_id BIGSERIAL NOT NULL PRIMARY KEY,
    tv_channel_name VARCHAR(200) NOT NULL
);


CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_first_name VARCHAR(200) NOT NULL,
    user_last_name VARCHAR(200) NOT NULL,
    user_location VARCHAR(200),
    user_email VARCHAR(200) NOT NULL,
    user_password VARCHAR(200) NOT NULL,
    user_is_admin BOOLEAN NOT NULL,
    tv_channel_id VARCHAR(36) REFERENCES tv_channels (tv_channel_id)
);

CREATE TABLE users(
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    user_first_name VARCHAR(200) NOT NULL,
    user_last_name VARCHAR(200) NOT NULL,
    user_location VARCHAR(200),
    user_email VARCHAR(200) NOT NULL UNIQUE,
    user_password VARCHAR(200) NOT NULL,
    user_is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    tv_channel_id_fk BIGINT REFERENCES tv_channels (tv_channel_id)
);

CREATE TABLE users(
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    user_first_name VARCHAR(200) NOT NULL,
    user_last_name VARCHAR(200) NOT NULL,
    user_email VARCHAR(200) NOT NULL UNIQUE,
    user_password VARCHAR(200) NOT NULL,
    user_location VARCHAR(200),
    user_notification_watching BOOLEAN DEFAULT FALSE,
    tv_channel_id_fk BIGINT REFERENCES tv_channels (tv_channel_id)
);

INSERT INTO users(user_first_name, user_last_name, user_email, user_password) VALUES ('Neno', 'Zidic', 'neno@gmail.com', 'neno123');

INSERT INTO users(user_first_name, user_last_name, user_email, user_password, user_is_admin) VALUES ('Admin', 'Admin', 'admin@gmail.com', 'admin123', true);

INSERT INTO tv_channels(tv_channel_name) VALUES ('HRT1');
INSERT INTO tv_channels(tv_channel_name) VALUES ('HRT2');
INSERT INTO tv_channels(tv_channel_name) VALUES ('RTL');
INSERT INTO tv_channels(tv_channel_name) VALUES ('NOVA TV');
INSERT INTO tv_channels(tv_channel_name) VALUES ('SPORT KLUB');

UPDATE users SET tv_channel_id = 1 WHERE user_id = 6;
SELECT * FROM tv_channels LEFT JOIN (SELECT tv_channel_id_fk, COUNT(tv_channel_id_fk) AS amount FROM users GROUP BY tv_channel_id_fk) users ON tv_channels.tv_channel_id = users.tv_channel_id_fk;
  select user_id, user_location from users;