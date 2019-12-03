DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Vereine;

CREATE TABLE Users(id serial PRIMARY KEY, email VARCHAR(255) NOT NULL, password_hash VARCHAR(255) NOT NULL,
vorname VARCHAR(255), nachname VARCHAR(255), geburtsdatum DATE, plz int, ort VARCHAR(255), handynummer bigint,
profilbeschreibung VARCHAR(255));

CREATE TABLE Vereine(id serial PRIMARY KEY, email VARCHAR(255) NOT NULL, password_hash VARCHAR(255) NOT NULL,
vereinsname VARCHAR(255), plz int, ort VARCHAR(255), handynummer bigint,
beschreibung VARCHAR(255));