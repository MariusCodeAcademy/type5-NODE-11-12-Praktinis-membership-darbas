const { ObjectId } = require('mongodb');
const { getArrayFromDB, createDocument } = require('./dbFunctions');

const DB_NAME = 'cao-practice';
const COLLECTION_NAME = 'users';

async function getAllUsersDb() {
  return getArrayFromDB(DB_NAME, COLLECTION_NAME);
}
async function createUserDb(newUserData) {
  if (!newUserData) throw new Error('nera newUserData');

  const newUserWithObjId = {
    ...newUserData,
    membership_id: ObjectId(newUserData.string_id),
  };
  delete newUserWithObjId.string_id;
  return createDocument(DB_NAME, COLLECTION_NAME, newUserWithObjId);
}

module.exports = {
  getAllUsersDb,
  createUserDb,
};
