const { successResponce } = require('../helpers/dbHelpers');

async function membershipsIndex(req, res) {
  successResponce(res, 'membershipsIndex');
}
async function createMembership(req, res) {
  successResponce(res, req.body);
}

module.exports = {
  membershipsIndex,
  createMembership,
};
