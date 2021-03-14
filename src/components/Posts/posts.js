import React from "react";

import { useInitialCheck } from "../../shared/utility";
import RenderPosts from "../../shared/RenderPosts/renderPosts";
import SlideShow from "../SlideShow/slideshow";

const Posts = () => {
  const header = useInitialCheck("Latest News");
  return (
    <>
      <SlideShow />
      {header}
      <RenderPosts limit={20} category="posts" />
    </>
  );
};

export default Posts;
