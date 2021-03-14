import React, { useEffect, useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import * as actions from "./store/actions";
import Admin from "./components/Admin/admin";
import Gallery from "./components/Gallery/gallery";
import GalleryUpload from "./components/Gallery/GalleryUpload/galleryUpload";
import Logout from "./components/Auth/Logout/logout";
import Homepage from "./components/HomePage/homepage";
import PostDetails from "./components/Posts/PostDetail/postDetails";
import Auth from "./components/Auth/auth.js";
import Layout from "./hoc/Layout/Layout";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const authCheckState = useCallback(() => dispatch(actions.authCheckState()), [
    dispatch,
  ]);
  useEffect(() => {
    authCheckState();
  }, [authCheckState]);

  let errorRoute = (
    <Route
      render={() => (
        <h2 style={{ textAlign: "center" }}>Error 404: page not found</h2>
      )}
    />
  );
  let routes = (
    <Switch>
      <Route path="/gallery" exact component={Gallery} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/posts/:title" exact component={PostDetails} />
      <Route path="/" exact component={Homepage} />
      {isAuthenticated ? (
        <Route path="/logout" exact component={Logout} />
      ) : null}
      {user && user.isAdmin ? (
        <Route path="/write" exact component={Admin} />
      ) : null}
      {user && user.isAdmin ? (
        <Route path="/gallery/upload" exact component={GalleryUpload} />
      ) : null}
      {errorRoute}
    </Switch>
  );

  return (
    <Layout>
      {routes}
      <ToastContainer />
    </Layout>
  );
};

export default App;
