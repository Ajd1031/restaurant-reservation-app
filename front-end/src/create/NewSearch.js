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
  };

  const handleChange = ({ target }) => {
    setMobile_number(target.value);
  };

  //returns to the perviously visited page if the cancel button is clicked
  function cancelHandler() {
    history.goBack();
  }

  return (
    <main>
      <div id="error">
        <ErrorAlert error={searchError} />
      </div>
      <div>
        <h2>Search</h2>
        <form className="group" onSubmit={handleSubmit}>
          <label>Mobile Number:</label>
          <input
            required
            placeholder="Enter a phone number"
            name="mobile_number"
            type="tel"
            value={mobile_number}
            onChange={handleChange}
          />
          <div className="group-row">
            <button className="full item cancel" onClick={cancelHandler}>
              Cancel
            </button>
            <button className="full item " type="submit">
              Find
            </button>
          </div>
        </form>
        {JSON.stringify(reservations) === "[]" ? (
          <p>No reservations found</p>
        ) : (
          <ReservationTable reservations={reservations} />
        )}
      </div>
    </main>
  );
}

export default NewSearch;
