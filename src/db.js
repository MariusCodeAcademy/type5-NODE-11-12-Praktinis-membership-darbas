require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGO_CONNECTION_STRING = process.env.MONGO_DB_STRING;
const dbClient = new MongoClient(MONGO_CONNECTION_STRING);

module.exports = dbClient;
