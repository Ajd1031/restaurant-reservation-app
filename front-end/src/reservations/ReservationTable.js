import React from "react";
import ReservationList from "./ReservationList";
//Creates a table to hold the information for reservations
function ReservationTable({ reservations }) {
  return (
    <div style={{overflow: "auto"}}>
      <table >
        <thead>
          <tr>
            <th>Name</th>
            <th >Mobile</th>
            <th>Time</th>
            <th>Size</th>
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
