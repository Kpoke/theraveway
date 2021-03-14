import React from "react";

import { componentMappings } from "../Item/item";
import classes from "./toolbar.module.css";

const Toolbar = ({ addItem }) => {
  return (
    <div className={classes.toolBar}>
      {Object.keys(componentMappings).map((key) => (
        <button key={key} onClick={() => addItem(key, "")}>
          {key}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
