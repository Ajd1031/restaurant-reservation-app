import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { deleteSeat } from "../utils/api";

// creates a list of tables based on data received from the API
function TableList() {
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [removeSeatError, setRemoveSeatError] = useState(null);

  useEffect(() => {
    const tableController = new AbortController();
    listTables(tableController.signal)
      .then((data) => {
        setTables(data);
      })
      .catch(setTablesError);
    return () => {
      tableController.abort();
    };
  }, []);

  const clickHandler = (event) => {
    event.preventDefault();
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      setRemoveSeatError(null);
      deleteSeat(event.target.value, abortController.signal)
        .then(() => {
          history.push("/");
        })
        .catch((data) => {
          setRemoveSeatError(data);
        });

      return () => abortController.abort();
    }
  };

  // if (tables.length > 0) {
  return tables.map((table) => {
    //let time = formattableTime(table.table_time)

    return (
      <tr key={table.table_id}>
        <ErrorAlert error={tablesError} />
        <ErrorAlert error={removeSeatError} />
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td>
          {table.reservation_id ? (
            <p data-table-id-status={table.table_id}>occupied</p>
          ) : (
            <p data-table-id-status={table.table_id}>free</p>
          )}
        </td>
        <td>
          {table.reservation_id ? (
            <button
              data-table-id-finish={table.table_id}
              onClick={clickHandler}
              value={table.table_id}
            >
              {" "}
              Finish{" "}
            </button>
          ) : null}
        </td>
      </tr>
    );
  });
  //}
}

export default TableList;
