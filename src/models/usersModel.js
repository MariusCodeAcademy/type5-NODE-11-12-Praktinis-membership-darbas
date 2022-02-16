const { ObjectId } = require('mongodb');
const {
  getArrayFromDB,
  createDocument,
  makeAggregateArrayFromDB,
} = require('./dbFunctions');

const DB_NAME = 'cao-practice';
const COLLECTION_NAME = 'users';

async function getAllUsersDb(order = 'asc') {
  const sortOrder = order === 'desc' ? -1 : 1;
  return makeAggregateArrayFromDB(DB_NAME, COLLECTION_NAME, {
    name: sortOrder,
  });
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
