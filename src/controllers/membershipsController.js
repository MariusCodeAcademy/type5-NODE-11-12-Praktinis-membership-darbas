const { successResponce, failResponce } = require('../helpers/dbHelpers');
const {
  getAllMembershipsDb,
  createMembershipDb,
} = require('../models/membershipModel');

async function membershipsIndex(req, res) {
  const allMbs = await getAllMembershipsDb();
  if (allMbs === false) {
    failResponce(res);
    return;
  }
  successResponce(res, allMbs);
}
async function createMembership(req, res) {
  if (!req.body) throw new Error('nepaduoti duomenys i post createMembership');
  const createResult = await createMembershipDb(req.body);
  if (createResult === false) {
    failResponce(res);
    return;
  }
  successResponce(res, createResult);
}

module.exports = {
  membershipsIndex,
  createMembership,
};
