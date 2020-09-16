import React from "react";
import { Link } from "react-router-dom";
import "./Body.css";

const Body = () => {
  return (
    <div className="container login-container">
      <div className="card">
        <div className="card-content">
          <h3>
            <i className="fas fa fa-book-reader"></i>StoryBooks
          </h3>

          <div className="section">
            <p className="lead">Create public and private Stories</p>
          </div>

          <div className="divider"></div>
          <div className="section">
            <Link to="/auth/signin" className="btn red darken-1">
              <i className="fa fa-sign-in" aria-hidden="true"></i>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
