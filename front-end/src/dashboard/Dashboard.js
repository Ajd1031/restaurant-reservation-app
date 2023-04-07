import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationTable from "../reservations/ReservationTable";
import TableTable from "../tables/TableTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate, tables, tablesError }) {
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

  //Changes which date's reservations are shown
  const handleDate = (event) => {
    event.preventDefault();
    const { value } = event.target;
    if (value === "previousDate") {
      setDate(previous(date));
    } else if (value === "nextDate") {
      setDate(next(date));
    } else if (value === "today") {
      setDate(today());
    }
  };

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
        <button onClick={handleDate} value="previousDate">
          previous
        </button>
        <button onClick={handleDate} value="nextDate">
          next
        </button>
        <button onClick={handleDate} value="today">
          today
        </button>
      </div>

      {JSON.stringify(tables) === "[]" ? (
        "There are currently no tables"
      ) : (
        <TableTable tables={tables} />
      )}
    </main>
  );
}

export default Dashboard;
