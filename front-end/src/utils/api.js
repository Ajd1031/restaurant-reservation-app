/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();
    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservations.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservations saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Creates a new reservation
 * @param newReservation
 *  the reservation to create, which must not have an `id` property
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the new reservation, which will have an `id` property.
 */
export async function createReservation(newReservation, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: newReservation }),
    signal,
  };
  return await fetchJson(url, options, newReservation);
}

/**
 * Creates a new table
 * @param newTable
 *  the table to create, which must not have an `id` property
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the new table, which will have an `id` property.
 */
export async function createTable(newTable, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: newTable }),
    signal,
  };
  return await fetchJson(url, options, newTable);
}

/**
 * Retrieves all existing tables.
 * @returns {Promise<[table]>}
 *  a promise that resolves to a possibly empty array of tables saved in the database.
 */

export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Adds reservation_id to existing table
 * @param reservation_id
 *  the id of the reservation that will be added to the table
 * @param table_id
 *  the id of the table that the reservation id will be added to
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the updated table.
 */
export async function updateTable(table_id, reservation_id, signal) {
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { reservation_id: reservation_id } }),
    signal,
  };
  return await fetchJson(url, options, reservation_id);
}

/**
 * Deletes the reservation_id from an existing table
 *  @param table_id
 *  the id of the table that the reservation id will be deleted from
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to an empty object.
 */
export async function deleteSeat(table_id, signal) {
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;
  const options = {
    method: "DELETE",
    headers,
    body: JSON.stringify(),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Changes the status of a reservation
 * @param reservation_id
 *  the id of the reservation that will have its status changed
 *  @param status
 *  the new status
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the reservation with an updated status.
 */
export async function updateStatus(status, reservation_id, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}/status`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({
      data: { reservation_id: reservation_id, status: status },
    }),
    signal,
  };
  return await fetchJson(url, options, reservation_id);
}

/**
 * Returns the information for a reservation
 * @param reservation_id
 *  the id of the reservation that will be returned
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to a table.
 */
export async function readReservation(reservation_id, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}`;
  const options = {
    method: "GET",
    headers,
    signal,
  };
  return await fetchJson(url, options, reservation_id);
}

/**
 * Updates a reservation
 * @param reservation_id
 *  the id of the reservation that will be updated
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the updated table.
 */
export async function updateReservation(
  reservation_id,
  updatedReservation,
  signal
) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: updatedReservation }),
    signal,
  };
  return await fetchJson(url, options, reservation_id);
}
