import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import * as actions from "../../../store/actions";
import SearchBar from "./Search/search";
import classes from "./deletePost.module.css";

const DeletePost = () => {
  const postsFound = useSelector((state) => state.posts.postsFound);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const deletePost = useCallback(
    (postId, token) => dispatch(actions.deletePost(postId, token)),
    [dispatch]
  );

  const deleteHandler = (postId) => {
    deletePost(postId, token);
  };
  let toShow = (
    <div className={classes.tiles}>
      {postsFound.map((post) => (
        <div key={post._id} className={classes.tile}>
          <h4 className={classes.title}>
            {post.title}
            <span onClick={() => deleteHandler(post._id)}>
              <FontAwesomeIcon
                icon={faTrash}
                style={{ color: "red", marginLeft: "10px" }}
              />
            </span>
          </h4>
        </div>
      ))}
    </div>
  );
  return (
    <>
      <h3 style={{ textAlign: "center" }}>Search and Delete a Post</h3>
      <SearchBar />
      {toShow}
    </>
  );
};

export default DeletePost;
