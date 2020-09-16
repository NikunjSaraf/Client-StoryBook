import React, { Fragment, useEffect, useState } from "react";
import { getSingleStory } from "./helper/storiesapicalls";
import Menu from "../core/Menu";
import dateFormat from "dateformat";

const GetStory = ({ match }) => {
  const [story, setStory] = useState([]);
  const [error, setError] = useState(false);

  const getStory = (storyId) => {
    getSingleStory(storyId).then((data) => {
      if (data?.error) {
        setError(data?.error);
      } else {
        setStory(data);
        // console.log(data);
        // console.log(data.user.name);
      }
    });
  };

  useEffect(() => {
    getStory(match.params.storyId);
  }, []);

  return (
    <Fragment>
      <div>
        <Menu />
      </div>
      <div className="container">
        {story && (
          <Fragment>
            <h3>{story.title}</h3>
            <div className="row">
              <div className="col s12 m8">
                <div className="card">
                  <div className="card-content">
                    <span className="card-title">
                      {dateFormat(
                        story.createdAt,
                        "dddd,mmmm dS, yyyy,h:MM:ss TT"
                      )}
                    </span>

                    <p>{story.body} </p>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default GetStory;
