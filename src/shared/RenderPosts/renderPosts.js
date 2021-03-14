import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import * as actions from "../../store/actions";
import Post from "../../components/Posts/PostPreview/postPreview";
import LoadingIndicator from "../../components/UI/Spinner/LoadingIndicator";
import Button from "../../components/UI/Button/button";
import classes from "./renderPosts.module.css";

const RenderPosts = ({ query, limit, disable, category }) => {
  const error = useSelector((state) => state.posts.error);
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const lengthOfPosts = useSelector((state) => state.posts.lengthOfPosts);
  const numPressed = useSelector((state) => {
    for (let index in state.posts.numOfTimesLoadMoreWasPressed) {
      if (state.posts.numOfTimesLoadMoreWasPressed[index].label === category) {
        return state.posts.numOfTimesLoadMoreWasPressed[index].numPressed;
      }
    }
  });

  const dispatch = useDispatch();

  const onInitPosts = useCallback(
    (queryString, trending, newComponent) =>
      dispatch(actions.initPosts(queryString, trending, newComponent)),
    [dispatch]
  );

  const setNumPressed = useCallback(
    (category) => dispatch(actions.setNumPressed(category)),
    [dispatch]
  );

  const setErrorFalse = useCallback(() => dispatch(actions.setErrorFalse()), [
    dispatch,
  ]);

  const [initialNumPressed, setInitialNumPressed] = useState(numPressed);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);
  const [newComponent, setNewComponent] = useState(true);

  const loadMore = () => {
    setInitialNumPressed((prevState) => prevState + 1);
    setLoadMoreClicked(true);
    setErrorFalse();
    setNewComponent(false);
  };

  useEffect(() => {
    setNumPressed("reset");
  }, [category, setNumPressed]);

  useEffect(() => {
    if (error && loadMoreClicked) {
      toast.error("An Error Occurred, Try Again", {
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    if (
      (numPressed === 0 && initialNumPressed === 0) ||
      initialNumPressed === numPressed + 1
    ) {
      if (initialNumPressed === numPressed + 1) {
        setNumPressed(category);
      }

      const queryString = `trending=false&${query}&limit=${limit}&skip=${
        initialNumPressed * limit
      }`;
      onInitPosts(queryString, false, newComponent);
    }
    setNewComponent(true);
  }, [
    initialNumPressed,
    numPressed,
    setNumPressed,
    onInitPosts,
    error,
    loadMoreClicked,
    limit,
    query,
    newComponent,
    category,
  ]);

  let toShow = null;

  if (posts.length > 0) {
    toShow = (
      <div className={classes.container}>
        <div className={classes.tiles}>
          {posts.map((post) => (
            <div key={post._id} className={classes.tile}>
              <NavLink to={`/posts/${post.title}`}>
                <Post title={post.title} imageUrl={post.imageUrl} />
              </NavLink>
            </div>
          ))}
        </div>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Button
            onClick={loadMore}
            btnType="Danger"
            style={{
              display:
                posts.length < lengthOfPosts && !disable ? "block" : "none",
            }}
          >
            LOAD MORE
          </Button>
        )}
      </div>
    );
  }

  return toShow;
};

export default RenderPosts;
