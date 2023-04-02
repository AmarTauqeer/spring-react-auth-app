import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddUser = () => {
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

    await axios.post("http://localhost:9191/api/v1/user/addUser", {
      userName: user.name,
      email: user.email,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      password: user.password,
    });
    navigate("/user");
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCancel = (e) => {
    navigate("/user");
  };

  return (
    <>
    <br />
      <h3 className="text-center mt-3">Add New User</h3>
      <br />
      <div class="card bg-light mt-3 p-2">
        <div class="card-body">
          <form onSubmit={handleSubmit} className="was-validated" noValidate>
            <div className="col-md-6 mb-3">
              <label for="exampleInputName" className="col-form-label-sm ">
                Name
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="exampleInputName"
                required
                name="name"
                autoComplete="off"
                value={user.name}
                onChange={(e) => onInputChange(e)}
              />
              <div class="invalid-feedback" style={{color:'salmon'}}>Please choose a username.</div>
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleInputName" className="col-form-label-sm ">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-sm"
                id="exampleInputName"
                name="password"
                required
                autoComplete="off"
                value={user.password}
                onChange={(e) => onInputChange(e)}
              />
              <div class="invalid-feedback" style={{color:'salmon'}}>Please choose a password.</div>
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleInputEmail1" className="col-form-label-sm ">
                Email address
              </label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                required
                autoComplete="off"
                value={user.email}
                onChange={(e) => onInputChange(e)}
              />
              <div class="invalid-feedback" style={{color:'salmon'}}>Please choose an email.</div>
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleInputAddress" className="col-form-label-sm ">
                First Name
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="exampleInputAddress"
                name="firstName"
                required
                autoComplete="off"
                value={user.firstName}
                onChange={(e) => onInputChange(e)}
              />
              <div class="invalid-feedback" style={{color:'salmon'}}>First name is required.</div>
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleInputPhone" className="col-form-label-sm ">
                Last Name
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="exampleInputPhone"
                name="lastName"
                autoComplete="off"
                value={user.lastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button
              type="button"
              className="btn btn-sm btn-outline-success"
              onClick={handleSubmit}
            >
              Submit
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
