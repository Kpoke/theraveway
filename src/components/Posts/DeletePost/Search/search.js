import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateObject } from "../../../../shared/utility";
import Input from "../../../UI/Input/input";
import * as actions from "../../../../store/actions";

const Search = React.memo(() => {
  const [searchBar, setSearchBar] = useState({
    elementType: "input",
    elementConfig: {
      type: "input",
      placeholder: "Enter title to search",
    },
    value: "",
    valid: true,
    touched: false,
  });
  const inputRef = useRef();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const searchPosts = useCallback(
    (titlePartial, token) => dispatch(actions.searchPosts(titlePartial, token)),
    [dispatch]
  );

  useEffect(() => {
    if (searchBar.touched === true) {
      const timer = setTimeout(() => {
        if (searchBar.value === inputRef.current.value) {
          searchPosts(searchBar.value, token);
        }
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [inputRef, searchBar.value, searchBar.touched, token, searchPosts]);

  const inputChangedHandler = (event) => {
    const updatedSearchBar = updateObject(searchBar, {
      value: event.target.value,
      touched: true,
    });

    setSearchBar(updatedSearchBar);
  };

  return (
    <Input
      elementType={searchBar.elementType}
      elementConfig={searchBar.elementConfig}
      value={searchBar.value}
      inputRef={inputRef}
      invalid={!searchBar.valid}
      shouldValidate={searchBar.validation}
      touched={searchBar.touched}
      changed={(event) => inputChangedHandler(event)}
    />
  );
});

export default Search;
