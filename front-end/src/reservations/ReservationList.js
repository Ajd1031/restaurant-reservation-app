import React from "react";
//creates the list of reservations based on the data received from the API
function ReservationList({ reservations }) {
  if (reservations.length > 0) {
    return reservations.map((reservation, index) => {
      //let time = formatReservationTime(reservation.reservation_time)
      return (
        <tr key={index}>
          <td>{reservation.first_name + " " + reservation.last_name}</td>
          <td>{reservation.mobile_number}</td>
          <td>{reservation.reservation_time}</td>
          <td>{reservation.people}</td>
          <td>
            <a href={`reservations/${reservation.reservation_id}/seat`}>
              <button>Seat</button>
            </a>
          </td>
        </tr>
      );
    });
  }
}

export default ReservationList;
