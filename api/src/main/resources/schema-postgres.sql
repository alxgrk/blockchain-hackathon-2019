DROP TABLE IF EXISTS Users;
CREATE TABLE Users(id serial PRIMARY KEY, email VARCHAR(255) NOT NULL, password_hash VARCHAR(255) NOT NULL,
vorname VARCHAR(255), nachname VARCHAR(255), geburtsdatum DATE, plz int, handynummer bigint,
profilbeschreibung VARCHAR(255));