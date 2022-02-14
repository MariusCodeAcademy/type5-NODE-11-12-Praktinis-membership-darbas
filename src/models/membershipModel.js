const {
  getArrayFromDB,
  createDocument,
  removeDocument,
} = require('./dbFunctions');

const DB_NAME = 'cao-practice';
const COLLECTION_NAME = 'memberships';

async function getAllMembershipsDb() {
  return getArrayFromDB(DB_NAME, COLLECTION_NAME);
}
async function createMembershipDb(newMembershipData) {
  if (!newMembershipData) throw new Error('nera newMembershipData');

  return createDocument(DB_NAME, COLLECTION_NAME, newMembershipData);
}
async function deleteDocDb(stringId) {
  if (!stringId) throw new Error('nera stringId deleteDocDb');

  return removeDocument(DB_NAME, COLLECTION_NAME, stringId);
}

module.exports = {
  getAllMembershipsDb,
  createMembershipDb,
  deleteDocDb,
};
