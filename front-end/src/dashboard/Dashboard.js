import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
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
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      {JSON.stringify(reservations) === "[]" ? (
        "There are no reservatons for this date."
      ) : (
        <ReservationTable reservations={reservations} />
      )}
      <div>
        <Link to={`/dashboard?date=${previous(date)}`} value="previousDate">
          previous
        </Link>
        <Link to={`/dashboard?date=${next(date)}`} value="nextDate">
          next
        </Link>
        <Link to="/dashboard" value="today">
          today
        </Link>
      </div>

      {JSON.stringify(tables) === "[]" ? (
        "There are currently no tables"
      ) : (
        <TableTable/>
      )}
    </main>
  );
}

export default Dashboard;
