import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { readReservation, updateReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import { formatAsTime } from "../utils/date-time";
import ReservationForm from "./ReservationForm";

function EditReservation() {
  const { reservation_id } = useParams();
  const whichForm = "edit";
  let initialValues = {
    reservation_id: reservation_id,
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
    status: "",
  };
  const history = useHistory();
  const [formData, setFormData] = useState({...initialValues});
  const [getReservationError, setGetReservationError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  //const [formData, setFormData] = useState(initialValues);
  
  useEffect(() => {
    async function getReservation(reservation_id) {
      const abortController = new AbortController();
      try {
        const response = await readReservation(
          reservation_id,
          abortController.signal
        );
        setFormData({...response, reservation_date: formatAsDate(response.reservation_date), reservation_time: formatAsTime(response.reservation_time)});
      } catch (error) {
        setGetReservationError(error);
      }
      return () => {
        abortController.abort();
      }
    }
    // setGetReservationError(null);
    // setFormData({});
    getReservation(reservation_id);
  }, [reservation_id]);







  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    formData.people = Number(formData.people);
   try {
    await updateReservation(reservation_id, formData, abortController.signal)
    history.push(`/dashboard?date=${formData.reservation_date}`);

   } catch (error) {
    setUpdateError(error);
   }
    return () => abortController.abort();
    // updateReservation(reservation_id, formData, abortController.signal)
    //   .then(() => {
    //     setFormData(initialValues);
    //     history.push("/dashboard");
    //   })
    //   .catch((error) => {
    //     setUpdateError(error);
    //   });
  };

  //returns to the perviously visited page if the cancel button is clicked
  function handleCancel() {
    history.goBack();
  }

  //saves any chages the user makes to the form
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  
  
  
  
  
  
  if (formData) {
    return <ReservationForm updateError={updateError} getReservationError={getReservationError} handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} handleCancel={handleCancel} whichForm={whichForm} />

  }
}

export default EditReservation;
