const spicedPg = require('spiced-pg');

const dbUrl = process.env.DATABASE_URL || 'postgres:postgres:postgres@localhost:5432/invoice';

const db = spicedPg(dbUrl);
