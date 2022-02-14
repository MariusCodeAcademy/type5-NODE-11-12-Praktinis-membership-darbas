const dbClient = require('../db');

async function getArrayFromDB(db, collection) {
  try {
    await dbClient.connect();
    const dataFromDb = await dbClient
      .db(db)
      .collection(collection)
      .find()
      .toArray();
    await dbClient.close();

    return dataFromDb;
  } catch (error) {
    console.warn('getArrayFromDB function error', error);
    return false;
  }
}

async function createDocument(db, collection, data) {
  try {
    await dbClient.connect();
    const createResult = await dbClient
      .db(db)
      .collection(collection)
      .insertOne(data);
    await dbClient.close();
    return createResult;
  } catch (error) {
    console.warn('error in createDocument', error);
    return false;
  }
}

module.exports = {
  getArrayFromDB,
  createDocument,
};