import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.password)

    await axios.post("http://localhost:9191/api/v1/user/addUser", {
      userName: user.name,
      email: user.email,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      userPassword: user.password,
    });
    navigate("/login");
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCancel = (e) => {
    navigate("/login");
  };

  return (
    <>
      <br />
      <div className="container w-25">
        <br />
        <div class="card mt-3">
          <div class="card-body">
            <h3 className="text-center mt-3">Registration</h3>
            <form onSubmit={handleSubmit} className="was-validated" noValidate>
              <div className="row d-flex justify-content-center">
                <div className="col-md-12 mb-3">
                  <label for="exampleInputName" className="col-form-label-sm ">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="exampleInputName"
                    required
                    autoComplete="off"
                    name="name"
                    value={user.name}
                    onChange={(e) => onInputChange(e)}
                  />
                  <div class="invalid-feedback" style={{color:'salmon'}}>Please choose a username.</div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-12 mb-3">
                  <label for="exampleInputName" className="col-form-label-sm ">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    id="exampleInputName"
                    autoComplete="off"
                    required
                    name="password"
                    value={user.password}
                    onChange={(e) => onInputChange(e)}
                  />
                  <div class="invalid-feedback" style={{color:'salmon'}}>Please choose a password.</div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-12 mb-3">
                  <label
                    for="exampleInputEmail1"
                    className="col-form-label-sm "
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    id="exampleInputEmail1"
                    autoComplete="off"
                    aria-describedby="emailHelp"
                    name="email"
                    required
                    value={user.email}
                    onChange={(e) => onInputChange(e)}
                  />
                  <div class="invalid-feedback" style={{color:'salmon'}}>Please choose an email.</div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-12 mb-3">
                  <label
                    for="exampleInputAddress"
                    className="col-form-label-sm "
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="exampleInputAddress"
                    autoComplete="off"
                    name="firstName"
                    required
                    value={user.firstName}
                    onChange={(e) => onInputChange(e)}
                  />
                  <div class="invalid-feedback" style={{color:'salmon'}}>First name is reuqired.</div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-12 mb-3">
                  <label for="exampleInputPhone" className="col-form-label-sm ">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="exampleInputPhone"
                    autoComplete="off"
                    name="lastName"
                    value={user.lastName}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-success col-md-6"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger col-md-6"
                  onClick={handleCancel}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
