import React from "react";
import ReservationList from "./ReservationList";
//Creates a table to hold the information for reservations
function ReservationTable({ reservations }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Time</th>
            <th>Number of guests</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <ReservationList reservations={reservations} />
        </tbody>
      </table>
    </div>
  );
}

export default ReservationTable;
