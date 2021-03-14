import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

import * as actions from "../../../../store/actions";
import Item from "./Item/item";
import Toolbar from "./Toolbar/toolbar";
import classes from "./postBuilder.module.css";
import Button from "../../../UI/Button/button";
import { toast } from "react-toastify";

const getTextAreaItem = (curIndex, items, form) => {
  if (items[curIndex].content !== "") {
    const textarea = items[curIndex];
    const media = [];

    const checkNextEntryIsMedia = (i) => {
      if (i > items.length - 1 || items[i].type === "textarea") {
        return;
      }
      if (items[i].content !== "") {
        media.push(items[i].build_id);
      }
      checkNextEntryIsMedia(i + 1);
    };

    checkNextEntryIsMedia(curIndex + 1);
    textarea["media"] = media;
    form.append("textarea", JSON.stringify(textarea));
  }
  return;
};

const refactorItems = (items) => {
  const form = new FormData();
  for (let i = 0; i < items.length; i++) {
    if (items[i].type === "img" && items[i].content !== "") {
      form.append("media", items[i].content.image);
    } else if (items[i].type === "video" && items[i].content !== "") {
      form.append("media", items[i].content.video);
    } else {
      getTextAreaItem(i, items, form);
    }
  }

  return form;
};

const PostBuilder = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const username = useSelector((state) => state.auth.user.username);

  const createPost = useCallback(
    (postData, token, username) =>
      dispatch(actions.createPost(postData, token, username)),
    [dispatch]
  );

  const addItem = (type, content) => {
    if (!(items.length === 0 && type !== "textarea")) {
      setItems((state) => [...state, { type, content, build_id: uuid() }]);
    }
  };

  const updateItem = (buildId, newContent) => {
    setItems((state) => {
      const itemIndex = state.findIndex((item) => item.build_id === buildId);
      const newState = [...state];
      newState[itemIndex].content = newContent;
      return newState;
    });
  };

  const deleteItem = (buildId) => {
    setItems(items.filter((item) => item.build_id !== buildId));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      addItem("textarea", "");
    }
  };

  const onChange = (event) => {
    const imageFile = event.target.files[0];
    setImage(imageFile);
  };

  const handleSubmit = () => {
    if (image && title !== "" && items.length > 0) {
      const form = refactorItems(items);
      form.append("image", image);
      form.append("title", title);
      createPost(form, token, username);
    } else {
      toast.error("Fill Empty Fields");
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.uploadHeader}>
        <p>Post Header</p>
        <input
          type="file"
          name="image"
          size="100"
          style={{ paddingLeft: 10 }}
          accept="image/*"
          onChange={onChange}
        />
      </div>
      <input
        type="text"
        style={{ paddingLeft: 10, margin: 7, width: "80%" }}
        placeholder="Title of the Post"
        onChange={(e) => setTitle(e.target.value)}
      />

      {items.map((item) => (
        <Item
          key={item.build_id}
          type={item.type}
          content={item.content}
          updateItem={(newContent) => updateItem(item.build_id, newContent)}
          deleteItem={() => deleteItem(item.build_id)}
          handleKeyPress={handleKeyPress}
        />
      ))}
      <Toolbar addItem={addItem} />
      <Button
        btnType="Success"
        onClick={handleSubmit}
        style={{ marginBottom: 30 }}
      >
        submit
      </Button>
    </div>
  );
};

export default PostBuilder;
