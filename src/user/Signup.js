import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data?.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(() => console.log("Error in Signup"));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/auth/signin">Login Here</Link>
          </div>
        </div>
      </div>
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
      {successMessage()}
      {errorMessage()}
      <div className="container" style={{ width: "50%" }}>
        <div className="row card ">
          <div className="card-content " style={{ marginTop: "25%" }}>
            <h4 className="center blue-text">Register Form</h4>
            <form className="row s12">
              <div className="col s12">
                <div className="input-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="First Name"
                    value={name}
                    onChange={handleChange("name")}
                  />
                </div>
              </div>
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
                  Register<i className="material-icons right">send</i>
                </button>
                <div>
                  <Link
                    to="/auth/signin"
                    className="left"
                    style={{ fontSize: "20px" }}
                  >
                    Already Have Account?Login
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

export default Signup;
