import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <ul className={classes.list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            首頁
          </NavLink>
        </li>

        {/* <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Products
          </NavLink>
        </li> */}
      </ul>
    </header>
  );
};

export default MainNavigation;
