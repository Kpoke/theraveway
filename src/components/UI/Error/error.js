import React from "react";

import classes from "./error.module.css";

const error = props => <div className={classes.error}>{props.children}</div>;

export default error;
