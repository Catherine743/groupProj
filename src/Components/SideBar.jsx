import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  return (
    <div className="sidebar">

      <h2 className="logo">Smart Inventory</h2>

      <div className="nav-links">

        <Link
          className={location.pathname === "/" ? "active" : ""}
          to="/"
        >
          Products
        </Link>

        <Link
          className={location.pathname === "/add" ? "active" : ""}
          to="/add"
        >
          Add Product
        </Link>

        <Link
          className={location.pathname === "/addsale" ? "active" : ""}
          to="/addsale"
        >
          Add Sale
        </Link>

        <Link
          className={location.pathname === "/dashboard" ? "active" : ""}
          to="/dashboard"
        >
          Dashboard
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;