import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import classes from "./item.module.css";
import Image from "../Image/image";
import Video from "../Video/video";

export const componentMappings = {
  img: (updateItem) => <Image updateItem={updateItem} />,
  video: (updateItem) => <Video updateItem={updateItem} />,
  textarea: (updateItem, payload) => <textarea {...payload} />,
};

const Item = ({ type, content, updateItem, handleKeyPress, deleteItem }) => {
  const textareaExtras = {
    value: content,
    className: classes.textBox,
    onChange: (e) => updateItem(e.target.value),
    onKeyPress: handleKeyPress,
  };
  return (
    <div>
      <div className={classes.tile}>
        {componentMappings[type](updateItem, textareaExtras)}
        <span onClick={deleteItem} className={classes.deleteButton}>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "red", marginLeft: "10px" }}
          />
        </span>
      </div>
    </div>
  );
};

export default Item;
