const { createMembership } = require('../controllers/membershipsController');
// const dbClient = require('../db');
const { getArrayFromDB, createDocument } = require('./dbFunctions');
const DB_NAME = 'cao-practice';
const COLLECTION_NAME = 'memberships';

async function getAllMembershipsDb() {
  return getArrayFromDB(DB_NAME, COLLECTION_NAME);
}
async function createMembershipDb(newMembershipData) {
  if (!newMembershipData) throw new Error('nera newMembershipData');
  return createDocument(DB_NAME, COLLECTION_NAME, newMembershipData);
}

module.exports = {
  getAllMembershipsDb,
  createMembershipDb,
};
