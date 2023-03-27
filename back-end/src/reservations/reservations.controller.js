const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//List handler for reservation resources
async function list(req, res) {
  const { date } = req.query;
  console.log("DATE:", date);
  const data = await service.list(date);

  res.status(200).json({ data });
}

//Validates the reservation_date value
function dateValidation(req, res, next) {
  const { data } = req.body;
  let date = new Date(data.reservation_date);
  let today = new Date();
  let number = Date.parse(date);
  if (isNaN(number)) {
    next({
      status: 400,
      message: `reservation_date is not a valid date`,
    });
  } else if ( date < today) {
    next({
      status: 400,
      message: `reservation must be made in the future`,
    });
  } else if (date.getDay() === 1) {
    next({
      status: 400,
      message: `the restaurant is closed on tuesday`,
    });
  } else {
    next();
  } 
}

//Validates the reservation_time value
function timeValidation(req, res, next) {
  const { data } = req.body;
  const validHHMMstring = (str) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(str);
  if (validHHMMstring(data.reservation_time)) {
    next();
  } else {
    next({
      status: 400,
      message: `reservation_time is not a valid time`,
    });
  }
}

//Validates the people value
function peopleValidation(req, res, next) {
  const { data } = req.body;
  console.log("THISSHOULDBEANUMBER:", data.people);
  if (isNaN(data.people)) {
    next({
      status: 400,
      message: `people is not a valid number`,
    });
  } else {
    next();
  }
}

//Checks that all required properties are present
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

//Creates a new reservation
async function create(req, res) {
  console.log("DATA:", req.body.data);
  const data = await service.create(req.body.data);
  res.status(201).json({ data: data[0] });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    peopleValidation,
    timeValidation,
    dateValidation,
    asyncErrorBoundary(create),
  ],
};
