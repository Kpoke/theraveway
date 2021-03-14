import React, { useState, useEffect } from "react";

import classes from "./image.module.css";

const CreateImage = ({ updateItem }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (event) => {
    const imageFile = event.target.files[0];
    setImageUrl(URL.createObjectURL(imageFile));
    setImage(imageFile);
  };

  useEffect(() => {
    if (image) {
      updateItem({ image: image });
    }
    // eslint-disable-next-line
  }, [image]);

  return (
    <div className={classes.createImage}>
      {!image && (
        <input type="file" size="100" accept="image/*" onChange={onChange} />
      )}
      {imageUrl && (
        <img src={imageUrl} alt={image.name} className={classes.image} />
      )}
    </div>
  );
};

const Image = ({ updateItem }) => {
  return (
    <div style={{ margin: "0 auto" }}>
      <CreateImage updateItem={updateItem} />
    </div>
  );
};

export default Image;
