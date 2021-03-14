import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios";
import { toast } from "react-toastify";

const setPosts = ({ posts, length }, newComponent) => {
  return {
    type: actionTypes.SET_POSTS,
    posts,
    length,
    newComponent,
  };
};

const setTrendingPosts = (trendingPosts) => {
  return {
    type: actionTypes.SET_TRENDING_POSTS,
    trendingPosts,
  };
};

const setSinglePostAndComment = ({ post, comments }) => {
  return {
    type: actionTypes.FETCH_SINGLE_POST,
    post: post,
    comments,
  };
};

const fetchPostsFailed = () => {
  return {
    type: actionTypes.FETCH_POSTS_FAILED,
  };
};

const initPostsStart = () => {
  return {
    type: actionTypes.POSTS_START,
  };
};

const setPopularPosts = (popularPosts) => {
  return {
    type: actionTypes.SET_POPULAR_POSTS,
    popularPosts,
  };
};

const setPostsFound = (postsFound) => {
  return {
    type: actionTypes.SET_POSTS_FOUND,
    postsFound,
  };
};

//Exports

export const setPostsInit = (postsInit) => {
  return {
    type: actionTypes.POSTS_INIT,
    postsInit,
  };
};

export const setErrorFalse = () => {
  return {
    type: actionTypes.SET_ERROR_FALSE,
  };
};

export const setNumPressed = (category) => {
  return {
    type: actionTypes.SET_NUM_PRESSED,
    category,
  };
};

//API Calls

export const initPosts = (queryString, trending, newComponent) => {
  return (dispatch) => {
    dispatch(initPostsStart());
    axios
      .get(`/api/posts?${queryString}`)
      .then((response) => {
        trending
          ? dispatch(setTrendingPosts(response.data.posts))
          : dispatch(setPosts(response.data, newComponent));
      })
      .catch((error) => {
        dispatch(fetchPostsFailed());
      });
  };
};

export const fetchSinglePost = (title) => {
  return (dispatch) => {
    axios
      .get(`/api/posts/singlePost/${title}`)
      .then((response) => {
        dispatch(setSinglePostAndComment(response.data));
      })
      .catch((error) => {
        dispatch(fetchPostsFailed());
      });
  };
};

export const sendComment = (comment, token, postId) => {
  let toastUpload;
  return (dispatch) => {
    axios
      .post(`/api/posts/${postId}/comment/new`, comment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (p) => {
          const progress = p.loaded / p.total;
          toastUpload = toast.dark("Loading...", {
            progress: progress,
          });
        },
      })
      .then((response) => {
        toast.dismiss(toastUpload);
        toast.dark("Comment Created Successfully", {
          hideProgressBar: true,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.dismiss(toastUpload);
        toast.error("An Error Occurred, Try Again", { hideProgressBar: true });
        dispatch(fetchPostsFailed());
      });
  };
};

export const setTrendingFalse = (postId, token) => {
  let toastUpload;
  return (dispatch) => {
    axios
      .post(
        `/api/posts/trendingToFalse`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (p) => {
            const progress = p.loaded / p.total;
            toastUpload = toast.dark("Loading...", {
              progress: progress,
            });
          },
        }
      )
      .then((response) => {
        toast.dismiss(toastUpload);
        toast.dark("Changed Successfully", {
          hideProgressBar: true,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.dismiss(toastUpload);
        toast.error("An Error Occurred, Try Again", {
          hideProgressBar: true,
          autoClose: 3000,
        });
        dispatch(fetchPostsFailed());
      });
  };
};

export const createPost = (postData, token, username) => {
  let toastUpload;
  return (dispatch) => {
    toastUpload = toast.dark("Loading....", { autoClose: false });
    axios
      .post(`/api/${username}/posts/new`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.dismiss(toastUpload);
        toast.dark("Post Added Successfully", {
          hideProgressBar: true,
          autoClose: 3000,
        });
        // window.location.reload();
      })
      .catch((error) => {
        toast.dismiss(toastUpload);
        toast.error(error.response.message, {
          hideProgressBar: true,
          autoClose: 3000,
        });
        dispatch(fetchPostsFailed());
      });
  };
};

export const searchPosts = (titlePartial, token) => {
  return (dispatch) => {
    axios
      .post(
        `/api/posts/searchPosts`,
        { title: titlePartial },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(setPostsFound(response.data.posts));
      })
      .catch((error) => {
        toast.error("Unable to Fetch from Server", {
          hideProgressBar: true,
          autoClose: 3000,
        });
        dispatch(fetchPostsFailed());
      });
  };
};

export const deletePost = (postId, token) => {
  let toastUpload;
  return (dispatch) => {
    axios
      .post(
        `/api/posts/deletePosts`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (p) => {
            const progress = p.loaded / p.total;
            toastUpload = toast.dark("Loading.....", {
              progress: progress,
            });
          },
        }
      )
      .then((response) => {
        toast.dismiss(toastUpload);
        toast.dark("Post Deleted Successfully", {
          hideProgressBar: true,
          autoClose: 3000,
        });
        window.location.reload();
      })
      .catch((error) => {
        toast.dismiss(toastUpload);
        toast.error("An Error Occurred, Try Again", {
          hideProgressBar: true,
          autoClose: 3000,
        });
        dispatch(fetchPostsFailed());
      });
  };
};

export const fetchPopularPosts = () => {
  return (dispatch) => {
    axios
      .get(`/api/posts/getPopularPosts`)
      .then((response) => {
        dispatch(setPopularPosts(response.data.posts));
      })
      .catch((error) => {
        dispatch(fetchPostsFailed());
      });
  };
};
