const knex = require("../db/connection");

function list(date = null) {
  if (date) {
    return knex("reservations as r")
      .select("*")
      .where({ reservation_date: date });
  } else {
    return knex("reservations").select("*");
  }
}

module.exports = {
  list,
};
