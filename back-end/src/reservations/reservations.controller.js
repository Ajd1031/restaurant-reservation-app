const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//List all reservations
async function list(req, res) {
  const { date } = req.query;
  const { mobile_number } = req.query;
  let data;
  if (mobile_number) {
    data = await service.search(mobile_number);
  } else {
    data = await service.list(date);
  }

  res.status(200).json({ data });
}

//Validates the reservation_date value
function dateValidation(req, res, next) {
  const { data } = req.body;
  let date = new Date(data.reservation_date + "," + data.reservation_time);
  console.log("DATEEEEE:", date)
  let today = Date.now();
  let number = Date.parse(date);
  if (isNaN(number)) {
    next({
      status: 400,
      message: `reservation_date is not a valid date`,
    });
  } else if (date < today) {
    next({
      status: 400,
      message: `reservation must be made in the future`,
    });
  } else if (date.getDay() === 2) {
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
  let time = new Date(data.reservation_date + "," + data.reservation_time);
  let openingTime = new Date(data.reservation_date + "," + "10:30:00");
  let closingTime = new Date(data.reservation_date + "," + "21:30:00");
  const validHHMMstring = (str) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(str);
  if (!validHHMMstring(data.reservation_time)) {
    next({
      status: 400,
      message: `reservation_time is not a valid time`,
    });
  } else if (time < openingTime) {
    next({
      status: 400,
      message: `the restaurant opens at 10:30:00`,
    });
  } else if (time > closingTime) {
    next({
      status: 400,
      message: `reservation must be hade at least an hour before closing`,
    });
  } else {
    next();
  }
}

function mobileNumberValidation(req, res, next) {
  const { data } = req.body;
  const mobile_number = data.mobile_number;
  if (!/^[0-9 -]+$/.test(mobile_number)) {
    return next({
      status: 400,
      message: "phone number can only contain numbers",
    });
  }
  next();
}

function mobileNumberSeachValidation(req, res, next) {
  const { mobile_number } = req.query;
  const { date } = req.query;

  if (date) {
    next();
    return;
  }

  if (!mobile_number) {
    next();
    return; 
  }

  if (!/^[0-9 -]+$/.test(mobile_number)) {
    return next({
      status: 400,
      message: "search can only contain phone numbers",
    });
  }
  next();
}

//Validates the people value
function peopleValidation(req, res, next) {
  const { data } = req.body;
  if (typeof data.people != "number") {
    next({
      status: 400,
      message: `people is not a valid number`,
    });
  } else {
    next();
  }
}

function createStatusValidation(req, res, next) {
  const { data } = req.body;

  if (data.status === "seated") {
    next({
      status: 400,
      message: "new reservations cannot have a status of seated",
    });
  } else if (data.status === "finished") {
    next({
      status: 400,
      message: "new reservations cannot have a status of finished",
    });
  } else {
    next();
  }
}

function updateStatusValidation(req, res, next) {
  const { data } = req.body;
  const acceptedStatus = ["finished", "seated", "booked", "cancelled"];
  if (acceptedStatus.includes(data.status)) {
    next();
  } else {
    next({
      status: 400,
      message: "status unknown",
    });
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

//Validates that the reservation_id exists
async function reservationExists(req, res, next) {
  const reservation_id = req.params.reservation_id;
  const foundReservation = await service.read(reservation_id);
  if (foundReservation) {
    res.locals.foundReservation = foundReservation;
    next();
  } else {
    next({
      status: 404,
      message: `reservation_id ${reservation_id} does not exist`,
    });
  }
}

async function reservationValidator(req, res, next) {
  const foundReservation = res.locals.foundReservation;
  foundReservation.status === "finished"
    ? next({
        status: 400,
        message: "a finished reservation cannot be updated",
      })
    : next();
}

function read(req, res) {
  const foundReservation = res.locals.foundReservation;
  res.status(200).json({ data: foundReservation });
}

//Creates a new reservation
async function create(req, res) {
  const received = req.body.data;
  const newTable = { ...received, status: "booked" };
  const data = await service.create(newTable);
  res.status(201).json({ data: data[0] });
}

async function updateStatus(req, res) {
  const reservation_id = req.params.reservation_id;
  const status = req.body.data.status;
  const data = await service.updateStatus(status, reservation_id);
  res.status(200).json({ data: data[0] });
}

async function update(req, res) {
  const updatedReservation = req.body.data;
  const data = await service.update(updatedReservation);
  res.status(200).json({ data: data[0] });
}

module.exports = {
  list: [mobileNumberSeachValidation, asyncErrorBoundary(list)],
  create: [
    hasRequiredProperties,
    peopleValidation,
    timeValidation,
    dateValidation,
    mobileNumberValidation,
    createStatusValidation,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), read],
  updateStatus: [
    updateStatusValidation,
    asyncErrorBoundary(reservationExists),
    reservationValidator,
    asyncErrorBoundary(updateStatus),
  ],
  update: [
    hasRequiredProperties,
    peopleValidation,
    timeValidation,
    dateValidation,
    mobileNumberValidation,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(update),
  ],
};
