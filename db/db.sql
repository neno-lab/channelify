CREATE DATABASE test;

CREATE TABLE tv_channels(
    tv_channel_id BIGSERIAL NOT NULL PRIMARY KEY,
    tv_channel_name VARCHAR(200) NOT NULL
);


CREATE TABLE users(
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    user_first_name VARCHAR(200) NOT NULL,
    user_last_name VARCHAR(200) NOT NULL,
    user_email VARCHAR(200) NOT NULL UNIQUE,
    user_password VARCHAR(200) NOT NULL,
    user_location VARCHAR(200),
    user_endpoint VARCHAR (200),
    user_auth VARCHAR (200),
    user_p256dh VARCHAR (200),
    tv_channel_id_fk BIGINT REFERENCES tv_channels (tv_channel_id)
);

INSERT INTO tv_channels(tv_channel_name) VALUES ('HRT1');
INSERT INTO tv_channels(tv_channel_name) VALUES ('HRT2');
INSERT INTO tv_channels(tv_channel_name) VALUES ('RTL');
INSERT INTO tv_channels(tv_channel_name) VALUES ('NOVA TV');
INSERT INTO tv_channels(tv_channel_name) VALUES ('SPORT KLUB');

