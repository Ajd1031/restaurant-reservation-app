import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "../reservations/ReservationForm";

function NewReservation() {
  const history = useHistory();
  const whichForm = "create"
  const [reservationsError, setReservationsError] = useState(null);
  let initialValues = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
    status: "",
  };
  const [newReservation, setNewReservation] = useState(initialValues);

  // sends a "POST" request to the API containing the user created reservation
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setReservationsError(null);
    newReservation.people = Number(newReservation.people)
    createReservation(newReservation, abortController.signal)
      .then(() => {
        setNewReservation(initialValues);
        history.push(`/dashboard?date=${newReservation.reservation_date}`);
      })
      .catch((error) => {
        setReservationsError(error);
      });

    return () => abortController.abort();
  };

  //returns to the perviously visited page if the cancel button is clicked
  function handleCancel() {
    history.goBack();
  }

  //saves any chages the user makes to the form
  const handleChange = ({ target }) => {
    setNewReservation({ ...newReservation, [target.name]: target.value });
  };

  return <ReservationForm reservationsError={reservationsError} handleSubmit={handleSubmit} newReservation={newReservation} handleChange={handleChange} handleCancel={handleCancel} whichForm={whichForm} />
}

export default NewReservation;
