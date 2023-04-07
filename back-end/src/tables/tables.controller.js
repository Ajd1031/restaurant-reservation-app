const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//Lists all tables
async function list(req, res) {
  const data = await service.list();
  res.status(200).json({ data });
}

//Checks that all required properities are present
const hasRequiredProperties = hasProperties("table_name", "capacity");

//Validates the name value
function nameValidation(req, res, next) {
  const { data } = req.body;
  if (data.table_name.length > 1) {
    next();
  } else {
    next({
      status: 400,
      message: "table_name must be longer than 1 character",
    });
  }
}

//Validates the capacity value
function capacityValidation(req, res, next) {
  const { data } = req.body;
  if (isNaN(data.capacity)) {
    next({
      status: 400,
      message: "capacity must be a number",
    });
  } else {
    next();
  }
}

//Creates a new table
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data: data[0] });
}

//Validates that the reservation_id exists
async function reservationExists(req, res, next) {
  const reservation_id = req.body.data.reservation_id;
  const foundReservation = await reservationService.read(reservation_id);

  if (foundReservation) {
    res.locals.foundReservation = foundReservation;
    next();
  } else {
    next({
      status: 404,
      message: `reservationId ${reservation_id} does not exist`,
    });
  }
}

//Validates that the table is compatiable with the reservation
async function tableValidator(req, res, next) {
  const table_id = req.params.table_id;
  const foundTable = await service.read(table_id);

  if (foundTable.reservation_id) {
    next({
      status: 400,
      message: `table ${foundTable.table_name} is occupied`,
    });
  } else if (foundTable.capacity < res.locals.foundReservation.people) {
    next({
      status: 400,
      message: `table ${foundTable.table_name} does not have sufficient capacity`,
    });
  } else {
    next();
  }
}

//Updates an existing table
async function update(req, res) {
  const table_id = req.params.table_id;
  const reservation_id = req.body.data.reservation_id;
  const data = await service.update(table_id, reservation_id);
  res.status(200).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    nameValidation,
    capacityValidation,
    asyncErrorBoundary(create),
  ],
  update: [
    hasProperties("reservation_id"),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableValidator),
    asyncErrorBoundary(update),
  ],
};
