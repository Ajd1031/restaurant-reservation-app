const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;
  console.log("DATE:", date);
  const data = await service.list(date);

  res.status(201).json({ data });
}

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

async function create(req, res) {
  console.log("DATA:", req.body.data);
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasRequiredProperties, asyncErrorBoundary(create)],
};
