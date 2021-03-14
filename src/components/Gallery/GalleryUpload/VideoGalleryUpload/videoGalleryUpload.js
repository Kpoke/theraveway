import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../../store/actions";
import { checkValidity } from "../../../../shared/utility";
import Input from "../../../UI/Input/input";
import Button from "../../../UI/Button/button";

const CreateVideoGalleryPost = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const createGalleryPost = useCallback(
    (postData, token, username, video) =>
      dispatch(actions.createGalleryPost(postData, token, username, video)),
    [dispatch]
  );

  const [captionForm, setCaptionForm] = useState({
    label: "Caption",
    elementType: "input",
    elementConfig: {
      type: "input",
      placeholder: "Caption for the Video",
    },
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  });
  const [video, setVideo] = useState(null);
  const [formWithoutVideoIsValid, setformWithoutVideoIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event) => {
    let updatedCaptionForm = {
      ...captionForm,
      value: event.target.value,
      touched: true,
      valid: checkValidity(event.target.value, captionForm.validation),
    };

    setCaptionForm(updatedCaptionForm);

    let formValidity = updatedCaptionForm.valid;

    setformWithoutVideoIsValid(formValidity);
    setFormIsValid(formValidity && video);
  };

  const onChange = (event) => {
    const videoFile = event.target.files[0];

    setVideo(videoFile);
    setFormIsValid(videoFile && formWithoutVideoIsValid);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const postData = new FormData();
    postData.append("media", video);
    postData.append("caption", captionForm.value);
    createGalleryPost(postData, token, user.username, true);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          key={captionForm.label}
          label={captionForm.label}
          elementType={captionForm.elementType}
          elementConfig={captionForm.elementConfig}
          value={captionForm.value}
          invalid={!captionForm.valid}
          shouldValidate={captionForm.validation}
          touched={captionForm.touched}
          changed={(event) => inputChangedHandler(event)}
        />
        <input
          type="file"
          size="100"
          style={{ paddingLeft: 10 }}
          accept="video/mp4,video/x-m4v,video/*"
          onChange={onChange}
        />
        <div style={{ textAlign: "center" }}>
          <Button btnType="Success" disabled={!formIsValid}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateVideoGalleryPost;
