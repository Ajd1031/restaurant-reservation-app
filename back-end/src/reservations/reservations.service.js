const knex = require("../db/connection");

function list(date = null) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

function create(newReservation) {
  return knex("reservations").insert(newReservation).returning("*");
}

module.exports = {
  list,
  read,
  create,
};
