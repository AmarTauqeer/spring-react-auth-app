import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';

export const User = (props) => {
  const { token } = props;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:9191/api/v1/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(result.data);
  };

  const handleDelete = async (id) => {
    const result = await axios.delete(
      `http://localhost:9191/api/v1/user/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    loadUsers();
  };

  return (
    <>
      <br />

      <h4 className="text-center">List of Users</h4>
      <br />
      <Link className="btn btn-outline-primary mx-2" to={`/addUser`}>
        <Icon.PlusCircle /> Add
      </Link>
      <br />
      <div class="card bg-light mt-3 p-2">
        <div class="card-body">
          <table className="table table-bordered bg-white">
            <thead>
              <tr>
                <th className="col-form-label-sm" scope="col">
                  Name
                </th>
                <th className="col-form-label-sm" scope="col">
                  Email
                </th>
                <th className="col-form-label-sm" scope="col">
                  First Name
                </th>
                <th className="col-form-label-sm" scope="col">
                  Last Name
                </th>
                <th className="col-form-label-sm" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="col-form-label-sm">{user.userName}</td>
                  <td className="col-form-label-sm">{user.email}</td>
                  <td className="col-form-label-sm">{user.userFirstName}</td>
                  <td className="col-form-label-sm">{user.userLastName}</td>
                  <td className="col-form-label-sm">
                    <Link
                      className="btn btn-sm btn-outline-info mx-2"
                      to={`/userDetail/${user.userName}`}
                    >
                      <Icon.Binoculars />
                    </Link>
                    
                    <Link
                      className="btn btn-sm btn-outline-primary mx-2"
                      to={`/edituser/${user.userName}`}
                    >
                      <Icon.PencilSquare />
                    </Link>
                    
                    
                    <button
                      className="btn btn-sm btn-outline-danger mx-2"
                      onClick={(e) => handleDelete(user.userName)}
                    >
                      <Icon.Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
