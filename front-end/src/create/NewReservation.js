import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation({ setDate }) {
  const history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);
  let initialValues = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };
  const [newReservation, setNewReservation] = useState(initialValues);

  // sends a "POST" request to the API containing the user created reservation
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setReservationsError(null);
    createReservation(newReservation, abortController.signal)
      .then(() => {
        setDate(newReservation.reservation_date);
        history.push("/");
        setNewReservation(initialValues);
      })
      .catch(setReservationsError);

    return () => abortController.abort();
  };

  //returns to the perviously visited page if the cancel button is clicked
  function cancelHandler() {
    history.goBack();
  }

  //saves any chages the user makes to the form
  const handleChange = ({ target }) => {
    setNewReservation({ ...newReservation, [target.name]: target.value });
  };

  return (
    <div>
      <h2>New Reservation</h2>
      <ErrorAlert error={reservationsError} />
      <form onSubmit={handleSubmit}>
        <label>First Name: </label>
        <input
          required
          name="first_name"
          type="text"
          placeholder="First Name"
          value={newReservation.first_name}
          onChange={handleChange}
        />
        <label>Last Name: </label>
        <input
          required
          name="last_name"
          type="text"
          placeholder="Last Name"
          value={newReservation.last_name}
          onChange={handleChange}
        />
        <label>Phone Number: </label>
        <input
          required
          name="mobile_number"
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="123-123-1234"
          value={newReservation.mobile_number}
          onChange={handleChange}
        />
        <label>Date: </label>
        <input
          required
          name="reservation_date"
          type="date"
          //min={today()}
          value={newReservation.reservation_date}
          onChange={handleChange}
        />
        <label>Time: </label>
        <input
          required
          name="reservation_time"
          type="time"
          value={newReservation.reservation_time}
          onChange={handleChange}
        />
        <label>Guests: </label>
        <input
          required
          name="people"
          type="integer"
          value={newReservation.people}
          onChange={handleChange}
        />
        <button onClick={cancelHandler}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewReservation;
