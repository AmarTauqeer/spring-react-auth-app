import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import axios from "axios";

import "./login.css";
import mainLogo from "../images/login-icon.png";

const Login = () => {
  const navigate = useNavigate();
  const [logInfo, setLogInfo] = useState({
    name: "",
    password: "",
    loggedin: false,
    token: "",
  });

  const onInputChange = (e) => {
    setLogInfo({ ...logInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(logInfo);

    const result = await axios.post("http://localhost:9191/authenticate", {
      userName: logInfo.name,
      userPassword: logInfo.password,
    });
    // console.log(result.data.user);

    if (result.data.user.userName) {
      UserProfile.setUserInfo(result.data);
      navigate("/");
      window.location.reload(false);
    } else {
      alert(result.data);
    }
  };
  return (
    <>
      <div className="form-container">
        <br />
        <div col-md-12 text-center border>
          <img src={mainLogo} width={50} height={50} />
        </div>
        <h3 className="col-lg-12 text-center mb-3">Login</h3>
        <br />
        <form onSubmit={handleSubmit} className="was-validated" noValidate>
          <div className="row g-3">
            <div className="col-md-3 text-end">
              <label
                for="inputEmail"
                className="col-form-label font-weight-bold"
              >
                <b>Name</b>
              </label>
            </div>
            <div className="col-md-9">
              <input
                type="text"
                name="name"
                id="inputEmail"
                className="form-control form-control-sm"
                aria-describedby="emailHelpInline"
                onChange={(e) => onInputChange(e)}
                value={logInfo.name}
                autoComplete="off"
                required
              />
               <div class="invalid-feedback" style={{color:'salmon'}}>Please choose a username.</div>
            </div>
           
          </div>
          <div className="row g-3">
            <div className="col-md-3 text-end">
              <label for="inputPassword6" className="col-form-label">
                <b>Password</b>
              </label>
            </div>
            <div className="col-md-9">
              <input
                type="password"
                name="password"
                id="inputPassword6"
                className="form-control form-control-sm"
                aria-describedby="passwordHelpInline"
                onChange={(e) => onInputChange(e)}
                value={logInfo.password}
                autoComplete="off"
                required
              />
              <div class="invalid-feedback" style={{color:'salmon'}}>Please choose a password.</div>
            </div>
            
          </div>
          <div className="row g-3">
            <div className="col-lg-3"></div>
            <div className="col-lg-9">
              <div className="d-grid">
                <button
                  className="btn btn-sm btn-success"
                  type="button"
                  onClick={handleSubmit}
                >
                  <b>Submit</b>
                </button>
              </div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-3"></div>
            <div className="col-lg-9 mb-4">
              <span>
                Don't have a account &nbsp;&nbsp;
                <Link to={"/register"} style={{ color: "white" }}>
                  Register
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
