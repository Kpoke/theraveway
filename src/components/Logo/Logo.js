import React from "react";

import Logo from "../../assets/images/logo.png";
import classes from "./Logo.module.css";

const logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={Logo} alt="TheRaveWay" style={{ height: "100%" }} />
  </div>
);

export default logo;
