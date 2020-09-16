import React, { Fragment, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getSingleStory, updateStory } from "./helper/storiesapicalls";
import M from "materialize-css/dist/js/materialize.min.js";

const ManageStory = ({ match }) => {
  const [values, setValues] = useState({
    title: "",
    body: "",
    status: "",
    error: false,
    success: false,
    didRedirect: false,
  });

  useEffect(() => {
    M.FormSelect.init(document.querySelector("#status"));
    preload(match.params.storyId);
  }, []);

  const { title, body, status, didRedirect, success } = values;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const preload = (storyId) => {
    getSingleStory(storyId).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: data.title,
          status: data.status,
          body: data.body,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, didRedirect: false, success: false });
    const storyData = {
      title: title,
      status: status,
      body: body,
    };
    console.log(storyData);
    updateStory(userId, token, match.params.storyId, storyData).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data?.error });
      } else {
        setValues({
          ...values,
          title: "",
          body: "",
          status: "",
          error: false,
          success: true,
          didRedirect: true,
        });
        console.log(data);
      }
    });
  };

  const performRedirect = () => {
    if (didRedirect && success) {
      return <Redirect to="/dashboard" />;
    }
  };

  return (
    <Fragment>
      {performRedirect()}
      <div className="container">
        <h3>Add Story</h3>

        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange("title")}
                />
                <label for="title">Title</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field">
                <select
                  name="status"
                  id="status"
                  value={status}
                  placeholder="Status"
                  onChange={handleChange("status")}
                >
                  <option>Select Status</option>

                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
                <label for="status">Status</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field">
                <h5>Tell Us Your Story:</h5>
                <textarea
                  name="body"
                  value={body}
                  placeholder="Tell Your Story"
                  onChange={handleChange("body")}
                  style={{
                    width: "100%",
                    height: "300px",
                    padding: "30px 20px",
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
                  }}
                ></textarea>
              </div>
            </div>

            <div className="row">
              <button
                type="submit"
                value="Save"
                className="btn"
                onClick={onSubmit}
              >
                Submit
              </button>
              <Link
                to="/dashboard"
                className="btn orange"
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ManageStory;
