import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <div className="group">
      <header className="d-flex justify-content-center">
        <Link to="/" className="link">
          <div>
            <h1>Periodic Tables</h1>
          </div>
        </Link>
      </header>
    
      <nav className="d-flex justify-content-center">
        <div>
          <ul className="group nav">
            <li id="navElement" className="itempaleturquoise">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li id="navElement" className="item">
              <Link className="nav-link longer" to="/search">
                Search
              </Link>
            </li>
            <li id="navElement" className="item">
              <Link className="nav-link shorter" to="/reservations/new">
                New Reservation
              </Link>
            </li>
            <li id="navElement" className="item">
              <Link className="nav-link" to="/tables/new">
                New Table
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
    </div>
  );
}

export default Menu;
