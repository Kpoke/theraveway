import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  posts: [],
  singlePost: null,
  comments: [],
  error: false,
  titleExists: null,
  numOfTimesLoadMoreWasPressed: [
    { label: "features", numPressed: 0 },
    { label: "keyGames", numPressed: 0 },
    { label: "betsPredictions", numPressed: 0 },
    { label: "transferArena", numPressed: 0 },
    { label: "fplScouts", numPressed: 0 },
    { label: "tacticalAnalysis", numPressed: 0 },
    { label: "posts", numPressed: 0 },
    { label: "reset", numPressed: 0 },
  ],
  trendingPosts: [],
  postInit: false,
  lengthOfPosts: null,
  loading: false,
  postsFound: [],
  popularPosts: [],
};

const setNumPressed = (state, action) => {
  let newLoadMore = [...state.numOfTimesLoadMoreWasPressed];
  let updatedLoadMoreElement;
  for (let index in newLoadMore) {
    if (newLoadMore[index].label === action.category) {
      updatedLoadMoreElement = {
        ...newLoadMore[index],
        numPressed: newLoadMore[index].numPressed + 1,
      };

      newLoadMore[index] = updatedLoadMoreElement;
    } else {
      updatedLoadMoreElement = {
        ...newLoadMore[index],
        numPressed: 0,
      };

      newLoadMore[index] = updatedLoadMoreElement;
    }
  }

  return updateObject(state, {
    numOfTimesLoadMoreWasPressed: newLoadMore,
  });
};

const setPosts = (state, action) => {
  return updateObject(state, {
    posts: action.newComponent
      ? action.posts
      : state.posts.concat(action.posts),
    lengthOfPosts: action.length,
    error: false,
    loading: false,
  });
};

const setTrendingPosts = (state, action) => {
  return updateObject(state, {
    trendingPosts: action.trendingPosts,
    error: false,
    loading: false,
  });
};

const setSinglePostAndComment = (state, { post, comments }) => {
  return updateObject(state, {
    singlePost: post,
    comments: comments,
    error: false,
  });
};

const setPostsInit = (state, action) => {
  return updateObject(state, { postInit: action.postsInit });
};

const setPostsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchPostsFailed = (state, action) => {
  return updateObject(state, { error: true, loading: false });
};

const setErrorFalse = (state, action) => {
  return updateObject(state, { error: false });
};

const setPostsFound = (state, action) => {
  return updateObject(state, {
    postsFound: action.postsFound,
    error: false,
    loading: false,
  });
};

const setPopularPosts = (state, action) => {
  return updateObject(state, {
    popularPosts: action.popularPosts,
    error: false,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_POSTS:
      return setPosts(state, action);
    case actionTypes.FETCH_SINGLE_POST:
      return setSinglePostAndComment(state, action);
    case actionTypes.FETCH_POSTS_FAILED:
      return fetchPostsFailed(state, action);
    case actionTypes.SET_NUM_PRESSED:
      return setNumPressed(state, action);
    case actionTypes.SET_TRENDING_POSTS:
      return setTrendingPosts(state, action);
    case actionTypes.POSTS_INIT:
      return setPostsInit(state, action);
    case actionTypes.POSTS_START:
      return setPostsStart(state, action);
    case actionTypes.SET_ERROR_FALSE:
      return setErrorFalse(state, action);
    case actionTypes.SET_POSTS_FOUND:
      return setPostsFound(state, action);
    case actionTypes.SET_POPULAR_POSTS:
      return setPopularPosts(state, action);
    default:
      return state;
  }
};

export default reducer;
