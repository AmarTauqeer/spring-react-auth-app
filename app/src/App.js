import "./App.css";
import { User } from "./users/User";
import Home from "./pages/Home";
import { AddUser } from "./users/AddUser";
import { EditUser } from "./users/EditUser";
import { UserDetail } from "./users/UserDetail";
import { Navbar } from "./layout/Navbar";
import { Sidebar } from "./layout/Sidebar";
import UserProfile from "./users/UserProfile";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./users/Login";
import Department from "./department/Department";
import Employee from "./employee/Employee";
import { useState, useEffect } from "react";
import { EditDepartment } from "./department/EditDepartment";
import { AddDepartment } from "./department/AddDepartment";
import AddEmployee from "./employee/AddEmployee";
import EditEmployee from "./employee/EditEmployee";
import EmployeeDetail from "./employee/EmployeeDetail";
import { Registration } from "./users/Registration";

function App() {
  const [logInfo, setLogInfo] = useState({
    name: "",
    pass: "",
    loggedin: false,
    token: "",
  });

  useEffect(() => {
    const user = UserProfile.getUserInfo();
    // console.log(user);
    if (user !== null) {
      // console.log(user.email);
      setLogInfo({
        name: user.user.userName,
        loggedin: true,
        token: user.jwtToken,
      });
    }
  }, []);

  return (
    <>
      <Router>
        {logInfo.loggedin == false && (
          <>
            {/* <Login /> */}
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Registration />} />
            </Routes>
          </>
        )}

        {/* <Navbar loginfo={logInfo} /> */}
        {logInfo.loggedin == true && (
          <>
            <Sidebar>
              <Routes>
                <Route
                  exact
                  path="/user"
                  element={<User token={logInfo.token} />}
                />
                <Route exact path="/addUser" element={<AddUser />} />
                <Route
                  exact
                  path="/editUser/:id"
                  element={<EditUser token={logInfo.token} />}
                />
                <Route
                  exact
                  path="/userDetail/:id"
                  element={<UserDetail token={logInfo.token} />}
                />
                <Route
                  exact
                  path="/department"
                  element={<Department token={logInfo.token} />}
                />
                <Route
                  exact
                  path="/addDepartment"
                  element={<AddDepartment token={logInfo.token} />}
                />
                <Route
                  exact
                  path="/editDepartment/:id"
                  element={<EditDepartment token={logInfo.token} />}
                />

                <Route
                  exact
                  path="/employee"
                  element={<Employee token={logInfo.token} />}
                />
                <Route
                  exact
                  path="/addEmployee"
                  element={<AddEmployee token={logInfo.token} />}
                />
                <Route
                  exact
                  path="/editEmployee/:id"
                  element={<EditEmployee token={logInfo.token} />}
                />
                <Route
                  exact
                  path="/employeeDetail/:id"
                  element={<EmployeeDetail token={logInfo.token} />}
                />

                <Route exact path="/" element={<Home />} />
                {/* <Route exact path="/addUser" element={<AddUser />} /> */}
              </Routes>
            </Sidebar>
          </>
        )}
      </Router>
    </>
  );
}

export default App;
