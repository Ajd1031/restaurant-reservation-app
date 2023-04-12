import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { updateStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
//creates the list of reservations based on the data received from the API
function ReservationList({ reservations }) {
  const [cancelError, setCancelError] = useState();
  const history = useHistory();

  const handleCancel = async (event) => {
    event.preventDefault();

    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      setCancelError(null);
      updateStatus("cancelled", event.target.value, abortController.signal)
        .then(() => {
          history.go(0);
        })
        .catch((error) => {
          setCancelError(error);
        });

      return () => abortController.abort();
    }
  };

  if (reservations.length > 0) {
    <ErrorAlert error={cancelError} />;
    return reservations.map((reservation, index) => {
      //let time = formatReservationTime(reservation.reservation_time)
      return (
        <tr key={index}>
          <td>{reservation.first_name + " " + reservation.last_name}</td>
          <td>{reservation.mobile_number}</td>
          <td>{reservation.reservation_time}</td>
          <td>{reservation.people}</td>
          <td>
            <p data-reservation-id-status={`${reservation.reservation_id}`}>
              {`${reservation.status}`}
            </p>
          </td>
          <td>
            {reservation.status === "seated" ? null : (
              <button
                data-reservation-id-cancel={reservation.reservation_id}
                value={reservation.reservation_id}
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </td>
          <td>
            {reservation.status === "seated" ? null : (
              <Link to={`/reservations/${reservation.reservation_id}/edit`}>
                Edit
              </Link>
            )}
          </td>
          <td>
            {reservation.status === "seated" ? null : (
              <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                Seat
              </Link>
            )}
          </td>
        </tr>
      );
    });
  }
}

export default ReservationList;
