import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  error: false,
  numPressed: 0,
  lengthOfPosts: null,
  loading: false,
  gallery: [],
  postsInit: false,
};

const setGalleryNumPressed = (state, action) => {
  return updateObject(state, {
    numPressed: state.numPressed + 1,
  });
};

const setGalleryPosts = (state, action) => {
  return updateObject(state, {
    gallery: state.gallery.concat(action.gallery),
    lengthOfPosts: action.length,
    error: false,
    loading: false,
  });
};

const galleryStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const galleryFailed = (state, action) => {
  return updateObject(state, { loading: false, error: true });
};

const setGalleryErrorFalse = (state, action) => {
  return updateObject(state, { error: false });
};

const setGalleryPostsInit = (state, action) => {
  return updateObject(state, { postInit: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GALLERY:
      return setGalleryPosts(state, action);
    case actionTypes.GALLERY_START:
      return galleryStart(state, action);
    case actionTypes.GALLERY_FAILED:
      return galleryFailed(state, action);
    case actionTypes.SET_GALLERY_NUM_PRESSED:
      return setGalleryNumPressed(state, action);
    case actionTypes.SET_GALLERY_ERROR_FALSE:
      return setGalleryErrorFalse(state, action);
    case actionTypes.GALLERY_POSTS_INIT:
      return setGalleryPostsInit(state, action);

    default:
      return state;
  }
};

export default reducer;
