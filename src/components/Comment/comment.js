import React from "react";

import { monthArray } from "../../shared/utility";
import classes from "./comment.module.css";

const Comments = ({ comment, author, date }) => {
  const commentDate = new Date(date);
  return (
    <div className={classes.comment}>
      <p style={{ margin: 0 }}>
        <span className={classes.authorText}>{author}</span>
        <span>{` ${
          monthArray[commentDate.getMonth()]
        } ${commentDate.getDate()}, ${commentDate.getFullYear()} `}</span>
      </p>
      <p className={classes.commentText}>{comment}</p>
    </div>
  );
};

export default Comments;
