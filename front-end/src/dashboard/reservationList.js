import React from "react";

function ReservationList({ reservations }) {
  
  if (reservations.length > 0) {
    return reservations.map((reservation, index) => {
      return (
        <tr key={index}>
          <td>{reservation.first_name + " " + reservation.last_name}</td>
          <td>{reservation.mobile_number}</td>
          <td>{reservation.reservation_time}</td>
          <td>{reservation.people}</td>
        </tr>
      );
    });
  }
}

export default ReservationList;
