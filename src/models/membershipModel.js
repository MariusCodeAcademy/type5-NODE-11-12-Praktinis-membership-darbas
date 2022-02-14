const dbClient = require('../db');
const { getArrayFromDB } = require('./dbFunctions');
const DB_NAME = 'cao-practice';
const COLLECTION_NAME = 'memberships';

async function getAllMembershipsDb() {
  return getArrayFromDB(DB_NAME, COLLECTION_NAME);
}

module.exports = {
  getAllMembershipsDb,
};
