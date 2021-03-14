import React, { useState, useEffect } from "react";

import classes from "./video.module.css";

const CreateVideo = ({ updateItem }) => {
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const onChange = (event) => {
    const videoFile = event.target.files[0];
    setVideoUrl(URL.createObjectURL(videoFile));
    setVideo(videoFile);
  };

  useEffect(() => {
    if (video) {
      updateItem({ video });
    }
    // eslint-disable-next-line
  }, [video]);
  return (
    <div>
      {!video && (
        <input
          type="file"
          size="100"
          accept="video/mp4,video/x-m4v,video/*,.mkv"
          onChange={onChange}
        />
      )}
      {videoUrl && <video src={videoUrl} controls className={classes.video} />}
    </div>
  );
};

const Video = ({ updateItem }) => {
  return (
    <div style={{ margin: "0 auto" }}>
      <CreateVideo updateItem={updateItem} />
    </div>
  );
};

export default Video;
