import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";

function NewSeat() {
    const history = useHistory();
    const [seatError, setSeatError] = useState(null);

  //returns to the perviously visited page if the cancel button is clicked
  function cancelHandler() {
    history.goBack();
  }

  //NEED TO UPDATE TO MAKE A PUT REQUEST TO THE API
  const [newReservation, setNewReservation] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();

    const abortController = new AbortController();
    setSeatError(null);
    createReservation(newReservation, abortController.signal).catch(
      setSeatError
    );
    history.push("/");
    return () => abortController.abort();
  };

  return (
    <div>
      <h2>New Steat</h2>
      <ErrorAlert error={seatError} />
      <form onSubmit={handleSubmit} >
        <label>Table</label>
        <select name="table_id">
          {"Need to create a map that produces a list of table options"}
        </select>
        <button onClick={cancelHandler}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewSeat;
