import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const successMessage = () => {
      return(
        <div className="row">
         <div className="col-md-6 offset-sm-3 text-left">
          <div>
            <p className="alert alert-success" style = {{display: success ? "" : "none"}}>
                New User created successfully! Please <Link to="/signin">LOGIN HERE</Link>
            </p>
          </div>
         </div>
        </div>
      )
  }
  //bug..error message
  const errorMessage = () => {
    return(
        <div className="row">
         <div className="col-md-6 offset-sm-3 text-left">
          <div>
            <div className="alert alert-danger" style = {{display: error ? "" : "none"}}>
              {error.JSON}
           </div>
          </div>
         </div>
        </div>
    )
}

  const signUpForm = () => {
    return (
      <div className="row mb-3">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">NAME</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">EMAIL</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-light">PASSWORD</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn text-white btn-success btn-block">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="SIGN UP PAGE" description="SIGN UP TO CREATE NEW ACCOUNT">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-light text-center"></p>
    </Base>
  );
};

export default Signup;
