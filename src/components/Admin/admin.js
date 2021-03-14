import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../UI/Button/button";
import * as actions from "../../store/actions";
import Error from "../UI/Error/error";
import Spinner from "../UI/Spinner/Spinner";
import CreatePost from "../Posts/CreatePost/createPost";
import DeletePost from "../Posts/DeletePost/deletePost";
import classes from "./admin.module.css";

const Admin = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const trendingPosts = useSelector((state) => state.posts.trendingPosts);
  const error = useSelector((state) => state.posts.error);
  const loading = useSelector((state) => state.posts.loading);
  const dispatch = useDispatch();
  const onInitPosts = useCallback(
    (queryString, trending) =>
      dispatch(actions.initPosts(queryString, trending)),
    [dispatch]
  );
  const setTrendingFalse = useCallback(
    (postId, token) => dispatch(actions.setTrendingFalse(postId, token)),
    [dispatch]
  );
  const [toRerender, setToRerender] = useState(false);

  useEffect(() => {
    const queryString = `trending=true`;
    onInitPosts(queryString, true);
  }, [onInitPosts, toRerender]);

  const buttonHandler = (postId) => {
    setTrendingFalse(postId, token);
    setToRerender(true);
  };

  let toShow = error ? <Error>An Error Occured... </Error> : <Spinner />;

  if (!error && !loading && !(trendingPosts.length > 0)) {
    toShow = null;
  }

  if (trendingPosts.length > 0) {
    toShow = (
      <div className={classes.container}>
        <h3>List of Trending Articles</h3>
        <div className={classes.tiles}>
          {trendingPosts.map((post) => (
            <div key={post._id} className={classes.tile}>
              <h4 style={{ textTransform: "uppercase" }}>{post.title}</h4>
              <Button onClick={() => buttonHandler(post._id)} btnType="Danger">
                set to non-trending
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <>
      <CreatePost />
      {user && user.isSuperAdmin ? (
        <>
          <DeletePost />
          {toShow}
        </>
      ) : null}
    </>
  );
};

export default Admin;
