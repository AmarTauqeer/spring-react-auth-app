import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditUser = (props) => {
  const { token } = props;
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    firstName: "",
    lastName: "",
    // password:"",
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:9191/api/v1/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUser({
      name: result.data.userName,
      email: result.data.email,
      firstName: result.data.userFirstName,
      lastName: result.data.userLastName,
      // password: result.data.userPassword,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:9191/api/v1/user/update/${id}`,
      {
        userName: user.name,
        email: user.email,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        // userPassword:user.password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
      <h4 className="text-center mb-3">Update User</h4>
      <div class="card bg-light mt-3 p-2">
        <div class="card-body">
          <form onSubmit={handleSubmit} className="was-validated" noValidate>
            <div className="col-md-6 mb-3">
              <label for="exampleInputName" className="col-form-label-sm">
                Name
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="exampleInputName"
                name="name"
                required
                autoComplete="off"
                value={user.name}
                onChange={(e) => onInputChange(e)}
              />
              <div class="invalid-feedback" style={{color:'salmon'}}>Please choose a username.</div>
            </div>
            {/* <div className="col-md-6 mb-3">
          <label for="exampleInputName" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputName"
            name="password"
            value={user.password}
            onChange={(e) => onInputChange(e)}
          />
        </div> */}
            <div className="col-md-6 mb-3">
              <label for="exampleInputEmail1" className="fcol-form-label-sm">
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
              <label for="exampleInputAddress" className="col-form-label-sm">
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
              <label for="exampleInputPhone" className="col-form-label-sm">
                Last Name
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="exampleInputPhone"
                name="lastName"
                value={user.lastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
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
