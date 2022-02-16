const { ObjectId } = require('mongodb');
const dbClient = require('../db');

async function getArrayFromDB(db, collection, sort = {}, project = {}) {
  try {
    await dbClient.connect();
    const options = { sort, project };
    const dataFromDb = await dbClient
      .db(db)
      .collection(collection)
      .find({}, options)
      .toArray();
    await dbClient.close();

    return dataFromDb;
  } catch (error) {
    console.warn('getArrayFromDB function error', error);
    return false;
  }
}
async function makeAggregateArrayFromDB(
  db,
  collection,
  sort = {},
  project = {}
) {
  try {
    const pipeline = [
      {
        $match: {},
      },
      {
        $lookup: {
          from: 'memberships',
          localField: 'membership_id',
          foreignField: '_id',
          as: 'membership',
        },
      },
      {
        $sort: sort,
      },
      {
        $project: {
          membership_id: 0,
        },
      },
    ];

    await dbClient.connect();
    const options = { sort, project };
    const dataFromDb = await dbClient
      .db(db)
      .collection(collection)
      .aggregate(pipeline)
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
async function removeDocument(db, collection, stringId) {
  try {
    await dbClient.connect();
    const deleteResult = await dbClient
      .db(db)
      .collection(collection)
      .deleteOne({ _id: ObjectId(stringId) });
    await dbClient.close();
    return deleteResult;
  } catch (error) {
    console.warn('error in createDocument', error);
    return false;
  }
}

module.exports = {
  getArrayFromDB,
  createDocument,
  removeDocument,
  makeAggregateArrayFromDB,
};
