import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { authenticate, signin } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signin({ email, password })
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data?.error, loading: true });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(() => console.log("Error in signin"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/dashboard" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {performRedirect()}
      {loadingMessage()}
      {errorMessage()}
      <div className="container" style={{ width: "50%" }}>
        <div className="row card ">
          <div className="card-content " style={{ marginTop: "18%" }}>
            <h4 className="center blue-text">Login Form</h4>
            <form className="row s12">
              <div className="col s12">
                <div className="input-field">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email-Id"
                    value={email}
                    onChange={handleChange("email")}
                  />
                </div>
              </div>
              <div className="col s12">
                <div className="input-field">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange("password")}
                  />
                </div>
              </div>

              <div className="col s12 center">
                <button
                  className="btn btn-large waves-effect waves-light blue"
                  onClick={onSubmit}
                >
                  Login<i className="material-icons right">send</i>
                </button>
                <div>
                  <Link
                    to="/auth/signup"
                    className="left"
                    style={{ fontSize: "20px" }}
                  >
                    New User?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Signin;
