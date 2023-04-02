import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

const Employee = (props) => {
  const { token } = props;
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadEmployees();
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const result = await axios.get("http://localhost:9191/api/v1/department/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDepartments(result.data);
  };

  const loadEmployees = async () => {
    const result = await axios.get("http://localhost:9191/api/v1/employee/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setEmployees(result.data);
  };

  const handleDelete = async (id) => {
    const result = await axios.delete(
      `http://localhost:9191/api/v1/employee/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    loadEmployees();
  };

  return (
    <>
      <br />
      <h4 className="text-center">List of Employee</h4>
      <br />
      <Link className="btn btn-outline-primary mx-2" to={`/addEmployee`}>
      <Icon.PlusCircle /> Add
      </Link>
      <div class="card bg-light mt-3 p-2">
        <div class="card-body">
          <table className="table table-bordered bg-white">
            <thead>
              <tr>
                <th className="col-form-label-sm" scope="col">
                  #
                </th>
                <th className="col-form-label-sm" scope="col">
                  Name
                </th>
                <th className="col-form-label-sm" scope="col">
                  Deprtment
                </th>
                <th className="col-form-label-sm" scope="col">
                  Designation
                </th>
                <th className="col-form-label-sm" scope="col">
                  Email
                </th>
                <th className="col-form-label-sm" scope="col">
                  Address
                </th>
                <th className="col-form-label-sm" scope="col">
                  Phone
                </th>
                <th className="col-form-label-sm" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td className="col-form-label-sm">{employee.id}</td>
                  <td className="col-form-label-sm">{employee.name}</td>
                  <td className="col-form-label-sm">
                    {departments
                      .filter(
                        (dept) => dept.dept_id === employee.department.dept_id
                      )
                      .map((d) => d.name)}
                  </td>
                  <td className="col-form-label-sm">{employee.designation}</td>
                  <td className="col-form-label-sm">{employee.email}</td>
                  <td className="col-form-label-sm">{employee.address}</td>
                  <td className="col-form-label-sm">{employee.phone}</td>
                  <td className="col-form-label-sm">
                    <Link
                      className="btn btn-sm btn-outline-primary mx-2"
                      to={`/employeeDetail/${employee.id}`}
                    >
                      <Icon.Binoculars />
                    </Link>
                    <Link
                      className="btn btn-sm btn-outline-primary mx-2"
                      to={`/editEmployee/${employee.id}`}
                    >
                      <Icon.PencilSquare />
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger mx-2"
                      onClick={(e) => handleDelete(employee.id)}
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

export default Employee;
