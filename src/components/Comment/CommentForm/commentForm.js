import React, { useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { updateObject, checkValidity } from "../../../shared/utility";
import * as actions from "../../../store/actions";
import Input from "../../UI/Input/input";
import Button from "../../UI/Button/button";

const CommentForm = ({ setToRerender }) => {
  const history = useHistory();
  const location = useLocation();
  const token = useSelector(state => state.auth.token);
  const isAuthenticated = token !== null;
  const { _id } = useSelector(state => state.posts.singlePost);
  const dispatch = useDispatch();
  const sendComment = useCallback(
    (comment, token, postId) =>
      dispatch(actions.sendComment(comment, token, postId)),
    [dispatch]
  );
  const setAuthRedirectPath = useCallback(
    path => dispatch(actions.setAuthRedirectPath(path)),
    [dispatch]
  );
  const [comment, setComment] = useState({
    elementType: "input",
    elementConfig: {
      type: "input",
      placeholder: "Enter your comment"
    },
    value: "",
    validation: {
      required: true
    },
    valid: false,
    touched: false
  });

  const inputChangedHandler = event => {
    const updatedComment = updateObject(comment, {
      value: event.target.value,
      valid: checkValidity(event.target.value, comment.validation),
      touched: true
    });

    setComment(updatedComment);
  };

  const submitHandler = event => {
    event.preventDefault();
    if (!isAuthenticated) {
      setAuthRedirectPath(`${location.pathname}`);
      history.push("/auth");
    } else {
      if (comment.value === "") {
        toast.warn("Comments cannot be empty", {
          hideProgressBar: true,
          autoClose: 3000
        });
      } else {
        let commentData = {};
        commentData["comment"] = comment.value;
        sendComment(commentData, token, _id);
        setToRerender(true);
        const updatedComment = updateObject(comment, {
          value: ""
        });

        setComment(updatedComment);
      }
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <Input
        elementType={comment.elementType}
        elementConfig={comment.elementConfig}
        value={comment.value}
        invalid={!comment.valid}
        shouldValidate={comment.validation}
        touched={comment.touched}
        changed={event => inputChangedHandler(event)}
      />
      <div style={{ textAlign: "right" }}>
        <Button btnType="Success">Comment</Button>
      </div>
    </form>
  );
};

export default CommentForm;
