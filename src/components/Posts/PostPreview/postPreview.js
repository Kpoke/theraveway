import React from "react";

import classes from "./postPreview.module.css";

const postPreview = (props) => {
  return (
    <div className={classes.body}>
      <img src={props.imageUrl} alt={props.title} className={classes.image} />
      <h3 className={classes.text}>{props.title}</h3>
    </div>
  );
};

export default postPreview;
