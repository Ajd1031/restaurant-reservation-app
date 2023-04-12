import React from "react";

function TableOption({ table }) {
  if (!table.reservation_id) {
    return (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  }
  return null;
}

export default TableOption;
