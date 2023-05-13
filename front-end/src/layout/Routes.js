import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";
import React, { useState, useEffect } from "react";
import NewSeat from "../create/NewSeat";
import NewTables from "../create/NewTable";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewReservation from "../create/NewReservation";
import NewSearch from "../create/NewSearch";
import EditReservation from "../reservations/EditReservation";
import { listTables } from "../utils/api";
import useQuery from "../utils/useQuery";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const date = query.get("date") ? query.get("date") : today();
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  console.log("TODAYYYY:", today());
  useEffect(() => {
    const tableController = new AbortController();
    listTables(tableController.signal).then(setTables).catch(setTablesError);
    return () => {
      tableController.abort();
    };
  }, [date]);

  console.log("DATE:", date);

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
          tables={tables}
          tablesError={tablesError}
        />
      </Route>
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
      <Route path="/tables/new">
        <NewTables />
      </Route>
      <Route path="/reservations/:reservation_id/edit" >
        <EditReservation />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <NewSeat tables={tables} />
      </Route>
      <Route path={"/search"} >
        <NewSearch />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
