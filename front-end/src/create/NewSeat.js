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
      await updateTable(table_id, reservation_id, abortController.signal);
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
    <main>
      <div id="error">
        <ErrorAlert error={seatError} />
      </div>
      <div>
        <h2>New Steat</h2>
        <form className="group" onSubmit={handleSubmit}>
          <label>Table Number:</label>
          <select
            name="table_id"
            required
            onChange={handleChange}
            autoFocus
          >
            <option value="">Please pick a table</option>
            {tables.map((table) => (
              <TableOption key={table.table_id} table={table} />
            ))}
          </select>
          <div className="group-row">
            <button className="full item cancel space" onClick={cancelHandler}>
              Cancel
            </button>
            <button className="full item space" type="submit">
              submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default NewSeat;
