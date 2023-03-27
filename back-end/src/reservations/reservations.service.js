const knex = require("../db/connection");

function list(date = null) {
  
    return knex("reservations as r")
      .select("*")
      .where({ reservation_date: date })
      .orderBy("reservation_time");
 
}

function create(newReservation) {
  return knex("reservations").insert(newReservation).returning("*");
}

module.exports = {
  list,
  create,
};
