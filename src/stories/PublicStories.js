import React, { Fragment, useEffect, useState } from "react";
import Menu from "../core/Menu";
import { getPublicStories } from "./helper/storiesapicalls";
import userImg from "../images/user.png";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import DotDotDot from "react-dotdotdot";

const PublicStories = () => {
  const [story, setStory] = useState([]);
  const [error, setError] = useState(false);

  const { user } = isAuthenticated();
  const getPublicStory = () => {
    getPublicStories().then((data) => {
      if (data?.error) {
        setError(data?.error);
      } else {
        setStory(data);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    getPublicStory();
  }, []);

  return (
    <Fragment>
      <Menu />

      <div className="container">
        <h1>Stories</h1>
        <div className="row">
          {story ? (
            story.map((str, index) => (
              <Fragment key={index}>
                <div className="col s12 m4">
                  <div className="card">
                    <div class="card-image">
                      {str.user.name === user.name && (
                        <Link
                          to={`/story/edit/${str._id}`}
                          className="btn-floating halfway-fab blue"
                          // style={{
                          //   float: "right",
                          //   marginRight: "50px",
                          // }}
                        >
                          <i className="far fa-edit fa-2x"></i>
                        </Link>
                      )}
                    </div>
                    <div className="card-content center-align">
                      <h5>{str.title}</h5>
                      <DotDotDot clamp={3}>
                        <p>{str.body}</p>
                      </DotDotDot>
                      <br />
                      <div className="chip">
                        <img src={userImg} alt="" />
                        {str.user.name}
                      </div>
                    </div>
                    <div className="card-action center-align">
                      <Link to={`/story/${str._id}`} className="btn grey">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))
          ) : (
            <p>No Stories to Display</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default PublicStories;
