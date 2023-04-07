import React from "react";

function TableOption({ tables }) {
    if (tables) {
        return tables.map((table, index) => {
            return (
                <option key={index} name={table.table_name} value={table.table_id} > {table.table_name} - {table.capacity} </option>
            );
        });
    }
}

export default TableOption;