import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = (props) => {
  const {loggedin } = props.loginfo;
  const navigate=useNavigate()


  const handleLogout=(e)=>{
    localStorage.removeItem('userInfo');
    navigate('/')
    window.location.reload(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          Spring React Employee Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to={"/"}>
                Home
              </Link>
            </li>
            {loggedin == true && (
              <>
                <li class="nav-item">
                  <Link class="nav-link active" to={"/user"}>
                    User
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" to={"/department"}>
                    Department
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" to={"/employee"}>
                    Employee
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div>
          {loggedin == true && (
            <>
              <button className="btn btn-sm btn-outline-light" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {loggedin == false && (
            <>
              <Link className="btn btn-sm btn-outline-light" to={"/addUser"}>
                Register
              </Link>
              &nbsp;
              <Link className="btn btn-sm btn-outline-light" to={"/login"}>
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
