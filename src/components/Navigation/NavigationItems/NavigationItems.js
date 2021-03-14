import React from "react";

import { useSelector } from "react-redux";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Home
      </NavigationItem>
      <NavigationItem link="/gallery" exact>
        Gallery
      </NavigationItem>

      {props.isAuthenticated && user ? (
        user.isAdmin ? (
          <NavigationItem link="/write">Write</NavigationItem>
        ) : null
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/auth">Login/Signup</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
