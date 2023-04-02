import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UserDetail = (props) => {
  const { token } = props;
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    firstName: "",
    lastName: "",
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
    console.log(result.data);
    setUser({
      name: result.data.userName,
      email: result.data.email,
      firstName: result.data.userFirstName,
      lastName: result.data.userLastName,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:9191/api/v1/user/update/${id}`, {
      userName: user.name,
      email: user.email,
      userFirstName: user.firstName,
      userLastName: user.lastName,
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
      <h4 className="text-center mb-3">User Detail</h4>
      <div class="card bg-light mt-3 p-2">
        <div class="card-body">
          <form onSubmit={handleSubmit}>
            <div className="col-md-6 mb-3">
              <label for="exampleInputName" className="col-form-label-sm">
                Name
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="exampleInputName"
                name="name"
                value={user.name}
                onChange={(e) => onInputChange(e)}
                disabled
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleInputEmail1" className="col-form-label-sm">
                Email address
              </label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={user.email}
                onChange={(e) => onInputChange(e)}
                disabled
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleInputAddress" className="col-form-label-sm">
                First Name
              </label>
              <input
                type="text"
                className="form-control form-control"
                id="exampleInputAddress"
                name="firstName"
                value={user.firstName}
                onChange={(e) => onInputChange(e)}
                disabled
              />
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
                disabled
              />
            </div>

            {/* <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button> */}
            <button
              type="button"
              className="btn btn-md btn-outline-danger"
              onClick={handleCancel}
            >
              Back
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
