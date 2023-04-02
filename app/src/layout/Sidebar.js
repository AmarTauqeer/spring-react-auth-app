import React, { Children, useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import UserProfile from "../users/UserProfile";

export const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const [logInfo, setLogInfo] = useState({
    name: "",
    pass: "",
    loggedin: false,
    token: "",
  });

  const handleLogout = (e) => {
    console.log('hi')
    localStorage.removeItem("userInfo");
    navigate("/login")
    window.location.reload(false)
  };
  // console.log(loginfo.loggedin)
  useEffect(() => {
    const user = UserProfile.getUserInfo();
    // console.log(user);
    if (user !== null) {
      // console.log(user.user.email);
      setLogInfo({
        name: user.user.userName,
        loggedin: true,
        token: user.jwtToken,
      });
    }
  }, []);

  const menuItem = [
    {
      path: "/",
      name: "dashboard",
      icon: <Icon.Speedometer />,
    },
    {
      path: "/user",
      name: "user",
      icon: <Icon.ListNested />,
    },
    {
      path: "/department",
      name: "department",
      icon: <Icon.ListNested />,
    },
    {
      path: "/Employee",
      name: "employee",
      icon: <Icon.ListNested />,
    },
    {
      path: "/login",
      name: <span onClick={(e)=>handleLogout()}>logout</span>,
      icon: <Icon.BoxArrowInDownLeft onClick={(e)=>handleLogout()} />,
    },
  ];

  return (
    <>
      <div className="sideBarcontainer">
        <div style={{ width: isOpen ? "350px" : "80px" }} className="sidebar">
          <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
              Admin Panel
            </h1>
            <div
              style={{ marginLeft: isOpen ? "80px" : "0px" }}
              className="bars"
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
          {/* {console.log(logInfo)} */}
          {logInfo && (
            <>
              {menuItem.map((item, index) => (
                <>
                  <NavLink
                    to={item.path}
                    key={index}
                    className="link"
                    activeClassName="active"
                  >
                    <div className="icon">{item.icon}</div>
                    <div
                      style={{ display: isOpen ? "block" : "none" }}
                      className="link_text"
                    >
                      {item.name}
                    </div>
                  </NavLink>
                </>
              ))}
            </>
          )}
        </div>
        <main>{children}</main>
      </div>
    </>
  );
};
