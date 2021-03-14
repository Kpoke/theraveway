import React, { useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as actions from "../../../store/actions/index";

const Logout = () => {
  const dispatch = useDispatch();
  const logout = useCallback(() => dispatch(actions.logout()), [dispatch]);
  const resetAuthPath = useCallback(
    () => dispatch(actions.setAuthRedirectPath("/")),
    [dispatch]
  );

  useEffect(() => {
    logout();
    resetAuthPath();
  }, [logout, resetAuthPath]);

  return <Redirect to="/" />;
};

export default Logout;
