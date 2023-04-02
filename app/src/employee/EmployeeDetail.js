import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeDetail = (props) => {
  const { token } = props;
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    dept_id: "",
    designation: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadEmployee();
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const result = await axios.get("http://localhost:9191/api/v1/department/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(result.data);
    setDepartments(result.data);
  };
  const loadEmployee = async () => {
    const result = await axios.get(
      `http://localhost:9191/api/v1/employee/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setEmployee({
      name: result.data.name,
      email: result.data.email,
      address: result.data.address,
      phone: result.data.phone,
      designation: result.data.designation,
      dept_id: result.data.department.dept_id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:9191/api/v1/employee/update/${id}`,
      {
        name: employee.name,
        email: employee.email,
        address: employee.address,
        phone: employee.phone,
        dept_id: employee.dept_id,
        designation: employee.designation,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    navigate("/employee");
  };

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleCancel = (e) => {
    navigate("/employee");
  };

  return (
    <>
      <br />
      <h4 className="text-center mt-3">Employee Detail</h4>
      <br />
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
                value={employee.name}
                onChange={(e) => onInputChange(e)}
                disabled
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleInputAddress" className="col-form-label-sm">
                Department
              </label>
              <select
                className="form-control form-control-sm"
                name="dept_id"
                id="dept_id"
                value={employee.dept_id}
                onChange={(e) => onInputChange(e)}
                disabled
              >
                {departments.map((x) => {
                  return (
                    <option key={x.dept_id} value={x.dept_id}>
                      {x.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleInputName" className="col-form-label-sm">
                Designation
              </label>
              <select
                type="text"
                className="form-control form-control-sm"
                id="exampleInputName"
                name="designation"
                value={employee.designation}
                onChange={(e) => onInputChange(e)}
              >
                <option value="Software developer">Software developer</option>
                <option value="Hardware developer">Hardware developer</option>
                <option value="Accountant">Accountant</option>
              </select>
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
                value={employee.email}
                onChange={(e) => onInputChange(e)}
                disabled
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleInputAddress" className="col-form-label-sm">
                Address
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="exampleInputAddress"
                name="address"
                value={employee.address}
                onChange={(e) => onInputChange(e)}
                disabled
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleInputPhone" className="col-form-label-sm">
                Phone
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="exampleInputPhone"
                name="phone"
                value={employee.phone}
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
              className="btn btn-sm btn-outline-danger"
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

export default EmployeeDetail;
