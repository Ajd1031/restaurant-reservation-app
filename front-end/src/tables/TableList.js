import React from "react";
// creates a list of tables based on data received from the API
function TableList({ tables }) {
  if (tables.length > 0) {
    return tables.map((table, index) => {
      //let time = formattableTime(table.table_time)
      return (
        <tr key={index}>
          <td>{table.table_name}</td>
          <td>{table.capacity}
          </td>
          <td>
            {table.reservaton_id ? (
              <p data-table-id-status={table.table_id}>Occupied</p>
            ) : (
              <p data-table-id-status={table.table_id}>Free</p>
            )}
          </td>
        </tr>
      );
    });
  }
}

export default TableList;
