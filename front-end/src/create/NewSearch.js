import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ReservationTable from "../reservations/ReservationTable";
import ErrorAlert from "../layout/ErrorAlert";

function NewSearch() {
  const history = useHistory();
  const [searchError, setSearchError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [mobile_number, setMobile_number] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setSearchError(null);
    listReservations({ mobile_number }, abortController.signal)
      .then(setReservations)
      .catch(setSearchError);
    return () => {
      abortController.abort();
    };
  }

  const handleChange = ({ target }) => {
    setMobile_number(target.value);
  }

  //returns to the perviously visited page if the cancel button is clicked
  function cancelHandler() {
    history.goBack();
  }



  return (
    <div>
      <h2>Search For Reservation</h2>
      <ErrorAlert error={searchError} />
      <form onSubmit={handleSubmit}>
        <label>Mobile Number</label>
        <input required name="mobile_number" type="tel" value={mobile_number} onChange={handleChange} />
        <button onClick={cancelHandler}>Cancel</button>
        <button type="submit">Find</button>
      </form>

      {JSON.stringify(reservations) === "[]" ? (
        "No reservations found"
      ) : (
        <ReservationTable reservations={reservations} />
      )}
    </div>
  );
}

export default NewSearch;
