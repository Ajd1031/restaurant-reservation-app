const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(newTable) {
  return knex("tables").insert(newTable).returning("*");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id: table_id }).first();
}

function update(table_id, reservation_id) {
  return knex("tables")
    .select("reservation_id")
    .where({ table_id: table_id })
    .update({ reservation_id: reservation_id });
}

module.exports = {
  list,
  create,
  read,
  update,
};
