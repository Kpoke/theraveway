import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios";
import { toast } from "react-toastify";

const fetchGalleryStart = () => {
  return {
    type: actionTypes.GALLERY_START,
  };
};

const galleryPostsFailed = () => {
  return {
    type: actionTypes.GALLERY_FAILED,
  };
};

const setGalleryPosts = ({ gallery, length }) => {
  return {
    type: actionTypes.SET_GALLERY,
    gallery,
    length,
  };
};

export const setGalleryNumPressed = () => {
  return {
    type: actionTypes.SET_GALLERY_NUM_PRESSED,
  };
};

export const setGalleryPostsInit = () => {
  return {
    type: actionTypes.GALLERY_POSTS_INIT,
  };
};

export const setGalleryErrorFalse = () => {
  return {
    type: actionTypes.SET_GALLERY_ERROR_FALSE,
  };
};

export const fetchGallery = (query) => {
  return (dispatch) => {
    dispatch(fetchGalleryStart());
    axios
      .get(`/api/posts/gallery?${query}`)
      .then((response) => {
        dispatch(setGalleryPosts(response.data));
      })
      .catch((error) => {
        dispatch(galleryPostsFailed());
      });
  };
};

export const createGalleryPost = (postData, token, username, video) => {
  let toastUpload;
  let url = video
    ? `/api/${username}/gallery/new/media?video=true`
    : `/api/${username}/gallery/new/media`;
  return (dispatch) => {
    axios
      .post(url, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (p) => {
          const progress = p.loaded / p.total;
          toastUpload = toast.dark("Upload in Progress", {
            progress: progress,
          });
        },
      })
      .then((response) => {
        toast.dismiss(toastUpload);
        toast.dark("Gallery Post Added Successfully", {
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
        dispatch(galleryPostsFailed());
      });
  };
};
