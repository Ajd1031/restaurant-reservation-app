import React from "react";

import ReservationList from "./ReservationList";

function ReservationTable({ reservations }) {
  return (
    <div className="recipe-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Time</th>
            <th>Number of guests</th>
          </tr>
        </thead>
        <tbody>
          <ReservationList reservations = {reservations} />
        </tbody>
      </table>
    </div>
  );
}

export default ReservationTable;