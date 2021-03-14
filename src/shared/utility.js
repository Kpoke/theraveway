import React from "react";
import { useSelector } from "react-redux";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const useInitialCheck = (header) => {
  const error = useSelector((state) => state.posts.error);
  const loading = useSelector((state) => state.posts.loading);
  const posts = useSelector((state) => state.posts.posts);
  const trendingPosts = useSelector((state) => state.posts.trendingPosts);

  if (!loading && !error && (posts.length > 0 || trendingPosts.length > 0)) {
    return <h5 style={{ textAlign: "center", margin: "15px" }}>{header}</h5>;
  }
  if (
    loading === false &&
    error === false &&
    !(posts.length > 0) &&
    !(trendingPosts.length > 0)
  ) {
    return (
      <h5 style={{ textAlign: "left", margin: "10px" }}>
        Ooops, Nothing to Show Yet...
      </h5>
    );
  }
};
