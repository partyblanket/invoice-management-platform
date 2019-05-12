DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    accountid SERIAL PRIMARY KEY,
    organisationid SERIAL REFERENCES organisations(organisationid) ON DELETE CASCADE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(100),
    type VARCHAR(20),
    created_at BIGINT,
    UNIQUE
);

DROP TABLE IF EXISTS organisations;

CREATE TABLE organisations(
    organisationid SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at BIGINT,
);

DROP TABLE IF EXISTS orders;

CREATE TABLE orders(
    relationid SERIAL PRIMARY KEY,
    organisationid SERIAL REFERENCES organisations(organisationid) ON DELETE CASCADE,
    created_at BIGINT
);

DROP TABLE IF EXISTS items;

CREATE TABLE items(
    itemsid SERIAL PRIMARY KEY,
    organisationid SERIAL REFERENCES organisations(organisationid) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(100),
    lastprice INT,
    created_at BIGINT
);

DROP TABLE IF EXISTS clients;

CREATE TABLE clients(
    clientid SERIAL PRIMARY KEY,
    organisationid SERIAL REFERENCES organisations(organisationid) ON DELETE CASCADE,
    created_at BIGINT
);

DROP TABLE IF EXISTS addresses;

CREATE TABLE addresses(
    chatlineid BIGSERIAL PRIMARY KEY,
    relationid SERIAL REFERENCES relations(relationid) ON DELETE CASCADE NOT NULL,
    senderid SERIAL,
    created_at BIGINT
);