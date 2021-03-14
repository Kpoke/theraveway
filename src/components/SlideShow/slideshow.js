import React, { useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Carousel } from "react-bootstrap";

import Spinner from "../UI/Spinner/Spinner";
import Error from "../UI/Error/error";
import * as actions from "../../store/actions";
import classes from "./slideshow.module.css";

const Slideshow = ({ query }) => {
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const trendingPosts = useSelector((state) => state.posts.trendingPosts);
  const error = useSelector((state) => state.posts.error);
  const dispatch = useDispatch();
  const onInitPosts = useCallback(
    (queryString, trending) =>
      dispatch(actions.initPosts(queryString, trending)),
    [dispatch]
  );

  useEffect(() => {
    const queryString = `trending=true&${query}`;
    onInitPosts(queryString, true);
  }, [onInitPosts, query]);

  let toShow = error ? <Error>An Error Occured....</Error> : <Spinner />;

  if (!error && !loading && !(trendingPosts.length > 0)) {
    toShow = null;
  }

  if (posts.length > 0 || trendingPosts.length > 0) {
    toShow = (
      <div className={classes.container}>
        <Carousel>
          {trendingPosts.map((post) => (
            <Carousel.Item key={post._id}>
              <NavLink to={`/posts/${post.title}`}>
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="d-block w-100"
                />
                <Carousel.Caption>
                  <h3 className={classes.text}>{post.title}</h3>
                </Carousel.Caption>
              </NavLink>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
  return toShow;
};

export default Slideshow;
