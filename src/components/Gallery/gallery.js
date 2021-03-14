import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import * as actions from "../../store/actions";
import LoadingIndicator from "../../components/UI/Spinner/LoadingIndicator";
import Error from "../UI/Error/error";
import Spinner from "../UI/Spinner/Spinner";
import Button from "../../components/UI/Button/button";
import classes from "./gallery.module.css";

const GalleryPosts = () => {
  const error = useSelector((state) => state.gallery.error);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const gallery = useSelector((state) => state.gallery.gallery);
  const loading = useSelector((state) => state.gallery.loading);
  const lengthOfPosts = useSelector((state) => state.gallery.lengthOfPosts);
  const numPressed = useSelector((state) => state.gallery.numPressed);

  const postInit = useSelector((state) => state.posts.postInit);
  const dispatch = useDispatch();

  const fetchGallery = useCallback(
    (query) => dispatch(actions.fetchGallery(query)),
    [dispatch]
  );

  const setGalleryNumPressed = useCallback(
    () => dispatch(actions.setGalleryNumPressed()),
    [dispatch]
  );

  const setGalleryPostsInit = useCallback(
    () => dispatch(actions.setGalleryPostsInit()),
    [dispatch]
  );

  const setGalleryErrorFalse = useCallback(
    () => dispatch(actions.setGalleryErrorFalse()),
    [dispatch]
  );

  const [initialNumPressed, setInitialNumPressed] = useState(numPressed);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);

  const loadMore = () => {
    setInitialNumPressed((prevState) => prevState + 1);
    setLoadMoreClicked(true);
    setGalleryErrorFalse();
  };

  useEffect(() => {
    if (error && loadMoreClicked) {
      toast.error("An Error Occurred, Try Again", {
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    if (
      (numPressed === 0 && initialNumPressed === 0 && !postInit) ||
      initialNumPressed === numPressed + 1
    ) {
      initialNumPressed === numPressed + 1
        ? setGalleryNumPressed()
        : setGalleryPostsInit();
      fetchGallery(`limit=20&skip=${initialNumPressed * 20}`);
    }
  }, [
    initialNumPressed,
    numPressed,
    postInit,
    error,
    loadMoreClicked,
    setGalleryNumPressed,
    setGalleryPostsInit,
    fetchGallery,
  ]);

  let toShow = null;

  toShow = error ? <Error>An Error Occured....</Error> : <Spinner />;

  if (!error && !loading && !(gallery.length > 0)) {
    toShow = (
      <h5 style={{ textAlign: "center", margin: "10px" }}>
        Ooops, Nothing to Show Yet...{" "}
        {isAuthenticated && user ? (
          user.isAdmin ? (
            <NavLink to="/gallery/upload">
              <FontAwesomeIcon
                icon={faPlus}
                transform="grow-5"
                style={{ color: "black", float: "right" }}
              />
            </NavLink>
          ) : null
        ) : null}
      </h5>
    );
  }

  if (gallery.length > 0) {
    toShow = (
      <div className={classes.container}>
        <h5 style={{ margin: "10px" }}>
          Our Gallery
          {isAuthenticated && user ? (
            user.isAdmin ? (
              <NavLink to="/gallery/upload">
                <FontAwesomeIcon
                  icon={faPlus}
                  transform="grow-5 right-14"
                  style={{
                    color: "black",
                    float: "right",
                  }}
                />
              </NavLink>
            ) : null
          ) : null}
        </h5>
        <div className={classes.tiles}>
          {gallery.map((post) => (
            <div key={post._id} className={classes.tile}>
              {post.isVideo ? (
                <video src={post.imageUrl} controls className={classes.video} />
              ) : (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className={classes.image}
                />
              )}

              <div style={{ fontWeight: "600", fontSize: "large" }}>
                {post.caption}
              </div>
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
              display: gallery.length < lengthOfPosts ? "block" : "none",
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

export default GalleryPosts;
