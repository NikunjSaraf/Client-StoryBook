import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Menu from "../core/Menu";
import AddBtn from "../stories/AddBtn";
import { deleteStory } from "../stories/helper/storiesapicalls";
import { userStories } from "./helper/userapicalls";
import dateFormat from "dateformat";

const Dashboard = () => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(false);

  const user = isAuthenticated() && isAuthenticated().user;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getUserStory = () => {
    userStories(userId, token).then((data) => {
      if (data?.error) {
        setError(data?.error);
      } else {
        setStories(data);
        // console.log(data);
      }
    });
  };

  const deletethisStory = (storyId) => {
    deleteStory(userId, token, storyId).then((data) => {
      if (data?.error) {
        setError(data?.error);
      } else {
        getUserStory();
      }
    });
  };

  useEffect(() => {
    getUserStory();
  }, []);

  return (
    <Fragment>
      <div>
        <Menu />
      </div>
      <div className="container">
        <p>Welcome to Dashboard</p>
        <h2>Welcome {user.name} </h2>
        <p>Here are your stories</p>
        <table className="striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stories ? (
              stories.map((story, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/story/${story._id}`}>{story.title}</Link>
                  </td>
                  <td>
                    {" "}
                    {dateFormat(story.createdAt, "dddd,mmmm dS, yyyy,h:MM:ss")}
                  </td>
                  <td> {story.status} </td>
                  <td>
                    <Link to={`/story/edit/${story._id}`} className="btn">
                      <i className="far fa-edit fa-2x"></i>
                    </Link>
                    <button
                      className="btn"
                      style={{ marginLeft: "15px", color: "red" }}
                      onClick={() => {
                        deletethisStory(story._id);
                      }}
                    >
                      <i class="fas fa-trash fa-2x"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <h3>No Stories Create One</h3>
            )}
          </tbody>
        </table>
        <AddBtn />
      </div>
    </Fragment>
  );
};

export default Dashboard;
