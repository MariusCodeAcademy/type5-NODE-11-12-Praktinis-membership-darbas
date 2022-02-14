const { successResponce } = require('../helpers/dbHelpers');

async function membershipsIndex(req, res) {
  successResponce(res, 'membershipsIndex');
}
async function createMembership(req, res) {
  successResponce(res, 'createMembership');
}

module.exports = {
  membershipsIndex,
  createMembership,
};
