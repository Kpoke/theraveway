import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faTwitter,
//   faInstagram,
//   faFacebook,
// } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

import * as actions from "../../store/actions";
import classes from "./footer.module.css";

const Footer = () => {
  const dispatch = useDispatch();
  const popularPosts = useSelector((state) => state.posts.popularPosts);
  const fetchPopularPosts = useCallback(
    () => dispatch(actions.fetchPopularPosts()),
    [dispatch]
  );

  useEffect(() => {
    fetchPopularPosts();
  }, [fetchPopularPosts]);

  return (
    <div className={classes.container}>
      <div className={classes.gridContainer}>
        <div className={classes.section}>
          <h5 className={classes.header}>ABOUT US</h5>
          <p className={classes.about}>
            TheRaveWay is just a couple of homo sapiens spewing out random and
            potentially unpopular opinions backed with facts about anything and
            everything. Do read on with an open mind. Arigato.
          </p>
          {/* <div className={classes.icons}>
            <div className={classes.iconLinkContainer}>
              <a
                href=""
                className={classes.Link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
            <div className={classes.iconLinkContainer}>
              <a
                href=""
                className={classes.Link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
            <div className={classes.iconLinkContainer}>
              <a
                href=""
                className={classes.Link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
            <div className={classes.iconLinkContainer}>
              <a
                href=""
                className={classes.Link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          </div> */}
        </div>
        <div className={classes.section}>
          <h5
            className={classes.header}
            style={{ display: popularPosts.length > 0 ? "block" : "none" }}
          >
            Popular Posts
          </h5>
          {popularPosts.map((post) => (
            <NavLink
              to={`/posts/${post.title}`}
              key={post._id}
              className={classes.Link}
            >
              <h6 className={classes.postsText}>
                {post.title} - {post.views} Views
              </h6>
            </NavLink>
          ))}
        </div>
        <div className={classes.section}>
          <h5 className={classes.header}>Contribute</h5>
          <p className={classes.about}>
            Contribute to the project as a developer:{" "}
            <a
              href="https://github.com/Kpoke/theraveway"
              target="_blank"
              rel="noopener noreferrer"
            >
              Frontend
            </a>
            {", built with React or "}
            <a
              href="https://github.com/Kpoke/theraveway-backend"
              target="_blank"
              rel="noopener noreferrer"
            >
              Backend
            </a>
            {", built with NodeJs. "}
            Interested in writing on the platform, send a mail to:
            theravewayblog@gmail.com
          </p>
        </div>
      </div>
      <div className={classes.rights}>
        <p>
          <span>
            <FontAwesomeIcon icon={faCopyright} />
          </span>
          {`  ${new Date().getFullYear()} TheRaveWay | All Rights Reserved`}
        </p>
      </div>
    </div>
  );
};

export default Footer;
