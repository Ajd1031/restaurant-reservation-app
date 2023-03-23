const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;
  console.log("DATE:", date);
  const data = await service.list(date);
  
  res.json({ data });
}

module.exports = {
  list,
};
