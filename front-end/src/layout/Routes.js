import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";
import React, { useState, useEffect } from "react";
import NewSeat from "../create/NewSeat";
import NewTables from "../create/NewTable";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewReservation from "../create/NewReservation";
import { listTables } from "../utils/api";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [date, setDate] = useState("2020-12-31");
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(() => {
    const tableController = new AbortController();
    listTables(tableController.signal).then(setTables).catch(setTablesError);
    return () => {
      tableController.abort();
    };
  }, [date]);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          date={date}
          setDate={setDate}
          tables={tables}
          tablesError={tablesError}
        />
      </Route>
      <Route path="/reservations/new">
        <NewReservation setDate={setDate} />
      </Route>
      <Route path="/tables/new">
        <NewTables />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <NewSeat tables={tables} setDate={setDate} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
