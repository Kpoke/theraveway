import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  WhatsappShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  RedditShareButton,
  PinterestShareButton,
  FacebookIcon,
  RedditIcon,
  PinterestIcon,
  WhatsappIcon,
} from "react-share";

import { monthArray } from "../../../shared/utility";
import * as actions from "../../../store/actions";
import Error from "../../UI/Error/error";
import Spinner from "../../UI/Spinner/Spinner";
import Comment from "../../Comment/comment";
import CommentForm from "../../Comment/CommentForm/commentForm";
import classes from "./postDetails.module.css";

const getMediaUrl = (mediaArray, build_id) => {
  const media = mediaArray.find((element) => element.build_id === build_id);
  const image = media.imageUrl;
  return image;
};

const PostDetails = () => {
  const { title } = useParams();
  const post = useSelector((state) => state.posts.singlePost);
  const comments = useSelector((state) => state.posts.comments);
  const error = useSelector((state) => state.posts.error);
  const dispatch = useDispatch();
  const fetchSinglePost = useCallback(
    (title) => dispatch(actions.fetchSinglePost(title)),
    [dispatch]
  );
  const [toRerender, setToRerender] = useState(false);
  let postDate;
  post ? (postDate = new Date(post.createdAt)) : (postDate = null);

  useEffect(() => {
    fetchSinglePost(title);
  }, [fetchSinglePost, title, toRerender]);
  let toShow = error ? <Error>An Error Occured....</Error> : <Spinner />;
  if (post) {
    toShow = (
      <div className={classes.container}>
        <h1 className={classes.title}>{post.title}</h1>
        <img className={classes.image} src={post.imageUrl} alt="" />{" "}
        <p className={classes.meta}>
          By <span style={{ fontWeight: 700 }}>{post.author.username}</span>
          {` / ${
            monthArray[postDate.getMonth()]
          } ${postDate.getDate()}, ${postDate.getFullYear()} `}
          <span style={{ marginLeft: "10px", float: "right" }}>
            <FontAwesomeIcon icon={faEye} /> {post.views}
          </span>
          <span style={{ marginLeft: "10px", float: "right" }}>
            <FontAwesomeIcon icon={faCommentDots} /> {comments.length}
          </span>
        </p>
        <div className={classes.icons}>
          <TwitterShareButton
            url={`${window.location.href}`}
            className={classes.icon}
          >
            <TwitterIcon size={32} round={false} />
          </TwitterShareButton>

          <FacebookShareButton
            url={`${window.location.href}`}
            className={classes.icon}
          >
            <FacebookIcon size={32} round={false} />
          </FacebookShareButton>

          <RedditShareButton
            url={`${window.location.href}`}
            className={classes.icon}
          >
            <RedditIcon size={32} round={false} />
          </RedditShareButton>

          <PinterestShareButton
            url={`${window.location.href}`}
            media={post.imageUrl}
            className={classes.icon}
          >
            <PinterestIcon size={32} round={false} />
          </PinterestShareButton>

          <WhatsappShareButton
            title={post.title}
            url={`${window.location.href}`}
            className={classes.icon}
          >
            <WhatsappIcon size={32} round={false} />
          </WhatsappShareButton>
        </div>
        <div>
          {post.textareas.map((text, key) => {
            return (
              <div key={key}>
                <p className={classes.text}>
                  {text.content.split("\n").map((item, key) => {
                    return (
                      <React.Fragment key={key}>
                        {item}
                        <br />
                      </React.Fragment>
                    );
                  })}
                </p>
                {text.media.length > 0
                  ? text.media.map((media_id) => (
                      <img
                        className={classes.textImage}
                        key={media_id}
                        src={getMediaUrl(post.media_build_ids, media_id)}
                        alt=""
                      />
                    ))
                  : null}
              </div>
            );
          })}
        </div>
        <div className={classes.comment}>
          <CommentForm setToRerender={setToRerender} />
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment.comment}
              author={comment.author.username}
              date={comment.createdAt}
            />
          ))}
        </div>
      </div>
    );
  }

  return toShow;
};

export default PostDetails;
