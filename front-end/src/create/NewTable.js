import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewTables() {
  const history = useHistory();
  const [tableError, setTableError] = useState(null);

  let initialValues = {
    table_name: "",
    capacity: 0,
  };

  // sends a "put" request to the API containing the user created table
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setTableError(null);
    createTable(newTable, abortController.signal)
      .then(() => {
        setNewTable(initialValues);
        history.push("/dashboard");
      })
      .catch(setTableError);
    return () => abortController.abort();
  };

  //returns to the perviously visited page if the cancel button is clicked
  function cancelHandler() {
    history.goBack();
  }

  const [newTable, setNewTable] = useState(initialValues);

  const handleChange = ({ target }) => {
    setNewTable({ ...newTable, [target.name]: target.value });
  };

  return (
    <div>
      <h2>New Table</h2>
      <ErrorAlert error={tableError} />
      <form onSubmit={handleSubmit}>
        <label>Table Name</label>
        <input
          required
          name="table_name"
          type="text"
          placeholder="#1"
          value={newTable.table_name}
          onChange={handleChange}
        />
        <label>Capacity</label>
        <input
          required
          name="capacity"
          type="integer"
          placeholder="2"
          value={newTable.capacity}
          onChange={handleChange}
        />
        <button onClick={cancelHandler}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewTables;
