import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";

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

  // sends a "put" request to the API containing the user created reservation
  const handleSubmit = (event) => {
    event.preventDefault();

    const abortController = new AbortController();
    setReservationsError(null);
    createReservation(newReservation, abortController.signal).catch(
      setReservationsError
    );
    setDate(newReservation.reservation_date);
    history.push("/");
    setNewReservation(initialValues);
    return () => abortController.abort();
  };

  //returns to the perviously visited page if the cancel button is clicked
  function cancelHandler() {
    history.goBack();
  }

  const [newReservation, setNewReservation] = useState(initialValues);
  console.log(newReservation);

  //saves any chages the user makes to the form
  const handleChange = ({ target }) => {
    setNewReservation({ ...newReservation, [target.name]: target.value });
  };

  let date = new Date(newReservation.reservation_date);
  let checkToday = new Date(today());
  let closedError = null;
  let futureError = null;
  let compoundError = null;

  //creates error instances if the user enters an invalid reservation date
  if (date < checkToday && date.getDay() === 1) {
    compoundError = new Error(
      "Reservatons cannot be for tuesday's & reservation must be for a future date "
    );
  } else if (date.getDay() === 1) {
    closedError = new Error("Reservatons cannot be for tuesday's");
  } else if (date < checkToday) {
    futureError = new Error("Reservations must be for a future date");
  }

  let time = new Date(
    newReservation.reservation_date + "," + newReservation.reservation_time
  );
  let openingTime = new Date(
    `${newReservation.reservation_date} , 10:30:00`
  );
  let closingTime = new Date(
    `${newReservation.reservation_date}, 21:30:00`
  );

  //creates an error instance if the user enters an invalid reservation time
  if (time < openingTime && newReservation.reservation_time) {
    closedError = new Error("Reservatons cannot be made before 10:30 AM");
  } else if (time > closingTime ) {
    futureError = new Error("Reservations cannot be made after 9:30 PM");
  }
  console.log("ERRORRR:", reservationsError);
  return (
    <div>
      <h2>New Reservation</h2>
      <ErrorAlert error={reservationsError} />
      {compoundError === null ? null : <ErrorAlert error={compoundError} />}
      {closedError === null ? null : <ErrorAlert error={closedError} />}
      {futureError === null ? null : <ErrorAlert error={futureError} />}
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
