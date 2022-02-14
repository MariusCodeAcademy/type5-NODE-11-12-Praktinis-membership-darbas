const { successResponce, failResponce } = require('../helpers/dbHelpers');
const {
  getAllMembershipsDb,
  createMembershipDb,
  deleteDocDb,
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
async function deleteMembership(req, res) {
  const { deleteId } = req.params;
  if (!deleteId) {
    throw new Error('nepaduotas deleteId i delete deleteMembership');
  }

  const deleteResult = await deleteDocDb(deleteId);
  if (deleteResult === false) {
    failResponce(res);
    return;
  }
  if (deleteResult.deletedCount !== 1) {
    failResponce(res, 'nepavyko istrinti', 400);
    return;
  }
  successResponce(res, deleteResult);
}

module.exports = {
  membershipsIndex,
  createMembership,
  deleteMembership,
};
