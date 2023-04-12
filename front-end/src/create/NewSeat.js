import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import TableOption from "../tables/TableOption";
import { updateTable } from "../utils/api";
//import { today } from "../utils/date-time";

function NewSeat({ tables }) {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [seatError, setSeatError] = useState(null);
  //  const initialValues = {
  //   table_id: 0,
  // };
  const [table_id, setTable_id] = useState("");

  // sends a "PUT" request to the API to update an existing table
  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await updateTable(table_id, reservation_id, abortController.signal)
      history.push("/");
    } catch (error) {
      setSeatError(error);
    }
    return () => abortController.abort();
    // updateTable(tableId.table_id, reservation_id, abortController.signal)
    //   .then(() => {
    //     setTableId(initialValues);
    //     history.push("/");
    //   })
    //   .catch((data) => {
    //     setSeatError(data);
    //   });
  };

  //returns to the perviously visited page if the cancel button is clicked
  function cancelHandler() {
    history.goBack();
  }

  //saves any chages the user makes to the form
  const handleChange = ({ target }) => {
    setTable_id(target.value);
  };

  return (
    <div>
      <h2>New Steat</h2>
      <ErrorAlert error={seatError} />
      <form onSubmit={handleSubmit}>
        <label>Table Number</label>
        <select
          name="table_id"
          className="form-control"
          required
          onChange={handleChange}
          autoFocus
        >
          <option value="">Please pick a table</option>
          {tables.map((table) => (
            <TableOption key={table.table_id} table={table} />
          ))}
        </select>
        <button onClick={cancelHandler}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewSeat;
