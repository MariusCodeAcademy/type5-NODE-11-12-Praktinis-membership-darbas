const { successResponce, failResponce } = require('../helpers/dbHelpers');
const { getAllUsersDb, createUserDb } = require('../models/usersModel');

async function usersIndex(req, res) {
  const { order } = req.params;

  const allUsers = await getAllUsersDb(order);
  if (allUsers === false) {
    failResponce(res);
    return;
  }
  successResponce(res, allUsers);
}
async function createUser(req, res) {
  if (!req.body) throw new Error('nepaduoti duomenys i post createUser');
  /*
  req.body === {
  "name": "James",
  "surname": "Jameson",
  "email": "james.jameson@gmail.com",
  "string_id": "620a5f791e6b8db1b3aa26a6"
}
  */
  const createResult = await createUserDb(req.body);
  if (createResult === false) {
    failResponce(res);
    return;
  }
  successResponce(res, createResult, 201);
}

module.exports = {
  usersIndex,
  createUser,
};
