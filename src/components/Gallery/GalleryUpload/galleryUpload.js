import React from "react";

import ImageGalleryUpload from "./ImageGalleryUpload/imageGalleryUpload";
import VideoGalleryUpload from "./VideoGalleryUpload/videoGalleryUpload";

const galleryUpload = () => {
  return (
    <>
      <ImageGalleryUpload />
      <VideoGalleryUpload />
    </>
  );
};

export default galleryUpload;
