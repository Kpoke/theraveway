import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../../store/actions";
import { checkValidity } from "../../../../shared/utility";
import Input from "../../../UI/Input/input";
import Button from "../../../UI/Button/button";

const CreateImageGalleryPost = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const createGalleryPost = useCallback(
    (postData, token, username) =>
      dispatch(actions.createGalleryPost(postData, token, username)),
    [dispatch]
  );

  const [captionForm, setCaptionForm] = useState({
    label: "Caption",
    elementType: "input",
    elementConfig: {
      type: "input",
      placeholder: "Caption for the Image",
    },
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  });
  const [image, setImage] = useState(null);
  const [formWithoutImageIsValid, setformWithoutImageIsValid] = useState(false);
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

    setformWithoutImageIsValid(formValidity);
    setFormIsValid(formValidity && image);
  };

  const onChange = (event) => {
    const imageFile = event.target.files[0];

    setImage(imageFile);
    setFormIsValid(imageFile && formWithoutImageIsValid);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const postData = new FormData();
    postData.append("media", image);
    postData.append("caption", captionForm.value);
    createGalleryPost(postData, token, user.username);
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
          name="image"
          size="100"
          style={{ paddingLeft: 10 }}
          accept="image/*"
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

export default CreateImageGalleryPost;
