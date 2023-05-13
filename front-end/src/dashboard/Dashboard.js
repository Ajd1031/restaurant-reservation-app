import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationTable from "../reservations/ReservationTable";
import TableTable from "../tables/TableTable";
import { Link } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, tables, tablesError }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => {
      abortController.abort();
    };
  }

  return (
    <main>
      <div id="error">
        <ErrorAlert error={reservationsError} />
        <ErrorAlert error={tablesError} />
      </div>
      <div className="group">
        <div id="reservations" className="item-double">
          <h2>
            Reservations for{" "}
            {new Date(`${date}T${"12:23:23"}`).toLocaleDateString("en-gb", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </h2>
          <div className="margin-btm group-row">
            <Link
              id="button"
              className="link item"
              to={`/dashboard?date=${previous(date)}`}
              value="previousDate"
            >
              previous
            </Link>
            <Link
              id="button"
              to="/dashboard"
              value="today"
              className="link item"
            >
              today
            </Link>
            <Link
              id="button"
              to={`/dashboard?date=${next(date)}`}
              value="nextDate"
              className="link item"
            >
              next
            </Link>
          </div>
          <hr />
          {JSON.stringify(reservations) === "[]" ? (
            <p>No reservations found</p>
          ) : (
            <ReservationTable reservations={reservations} />
          )}
        </div>
        <div id="tables" className="item">
          <h2>Tables</h2>
          <hr />
          {JSON.stringify(tables) === "[]" ? (
            <p>There are currently no tables</p>
          ) : (
            <TableTable />
          )}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
