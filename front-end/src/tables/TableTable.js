import React from "react";
import TableList from "./TableList";
//Creates a table to hold the information for tables
function TableTable({ tables }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Table Number</th>
            <th>Capacity</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          <TableList tables={tables} />
        </tbody>
      </table>
    </div>
  );
}

export default TableTable;
