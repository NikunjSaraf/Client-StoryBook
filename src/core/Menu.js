import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import M from "materialize-css/dist/js/materialize.min.js";
import libary from "../images/libary.jpg";

const Menu = ({ history }) => {
  useEffect(() => {
    M.Sidenav.init(document.querySelector(".sidenav"));
  }, []);

  const user = isAuthenticated() && isAuthenticated().user;

  return (
    <div>
      <nav>
        <div className="nav-wrapper blue">
          <a
            data-target="slide-out"
            className="sidenav-trigger show-on-large"
            style={{ cursor: "pointer" }}
          >
            <i className="material-icons">menu</i>
          </a>
          <Link to="/" className="brand-logo center">
            StoryBooks
          </Link>
        </div>
      </nav>
      {isAuthenticated() && (
        <ul id="slide-out" className="sidenav">
          <li>
            <div className="user-view">
              <div className="background">
                <img
                  src={libary}
                  alt=""
                  style={{ objectFit: "cover", width: "100%", height: "120%" }}
                />
              </div>
              <span className="white-text name">{user.name} </span>
              <span className="white-text email"> {user.email} </span>
            </div>
          </li>
          <li>
            <div className="divider"></div>
          </li>

          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/public/stories">Public Stories</Link>
          </li>
          <li>
            <Link>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Logout
              </span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default withRouter(Menu);
