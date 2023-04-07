import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import TableOption from "../tables/TableOption";
import { updateTable } from "../utils/api";
import { today } from "../utils/date-time";

function NewSeat({ tables, setDate }) {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [seatError, setSeatError] = useState(null);
  const initialValues = {
    table_id: 0,
  };
  const [tableId, setTableId] = useState(initialValues);

  // sends a "PUT" request to the API to update an existing table
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setSeatError(null);
    updateTable(tableId.table_id, reservation_id, abortController.signal)
      .then(() => {
        let date = today();
        setDate(date);
        history.push("/");
        setTableId(initialValues);
      })
      .catch((data) => {
        setSeatError(data);
      });

    return () => abortController.abort();
  };

  //returns to the perviously visited page if the cancel button is clicked
  function cancelHandler() {
    history.goBack();
  }

  //saves any chages the user makes to the form
  const handleChange = ({ target }) => {
    setTableId({ ...tableId, [target.name]: target.value });
  };

  return (
    <div>
      <h2>New Steat</h2>
      <ErrorAlert error={seatError} />
      <form onSubmit={handleSubmit}>
        <label>Table</label>
        <select
          name="table_id"
          onChange={handleChange}
          value={tableId.table_id}
        >
          <option value={0}>Please pick a table</option>
          <TableOption tables={tables} />
        </select>
        <button onClick={cancelHandler}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewSeat;
