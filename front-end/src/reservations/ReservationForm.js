import React from "react";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm({
  handleSubmit = null,
  newReservation = null,
  handleChange = null,
  handleCancel = null,
  reservationsError = null,
  updateError = null,
  getReservationError = null,
  formData = null,
  whichForm = null,
}) {
  if (whichForm === "edit") {
    return (
      <main>
        <h2>Update Reservation</h2>
        <ErrorAlert error={updateError} />
        <ErrorAlert error={getReservationError} />
        <form className="group" onSubmit={handleSubmit}>
          <label>First Name: </label>
          <input
            required
            name="first_name"
            type="text"
            placeholder=""
            value={formData.first_name}
            onChange={handleChange}
          />
          <label>Last Name: </label>
          <input
            required
            name="last_name"
            type="text"
            placeholder=""
            value={formData.last_name}
            onChange={handleChange}
          />
          <label>Phone Number: </label>
          <input
            required
            name="mobile_number"
            type="tel"
            placeholder=""
            value={formData.mobile_number}
            onChange={handleChange}
          />
          <label>Date: </label>
          <input
            required
            name="reservation_date"
            type="date"
            placeholder=""
            value={formData.reservation_date}
            onChange={handleChange}
          />
          <label>Time: </label>
          <input
            required
            name="reservation_time"
            type="time"
            placeholder=""
            value={formData.reservation_time}
            onChange={handleChange}
          />
          <label>Guests: </label>
          <input
            required
            name="people"
            type="integer"
            placeholder=""
            value={formData.people}
            onChange={handleChange}
          />
          <div className="group-row">
            <button className="full item cancel space" onClick={handleCancel}>
              Cancel
            </button>
            <button className="full item space" type="submit">
              Submit
            </button>
          </div>
        </form>
      </main>
    );
  } else if (whichForm === "create") {
    return (
      <main>
        <h2>New Reservation</h2>
        <ErrorAlert error={reservationsError} />
        <form className="group" onSubmit={handleSubmit}>
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
            //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
          <div className="group-row">
            <button className="full item cancel space" onClick={handleCancel}>
              Cancel
            </button>
            <button className="full item space" type="submit">
              Submit
            </button>
          </div>
        </form>
      </main>
    );
  }
}

export default ReservationForm;
