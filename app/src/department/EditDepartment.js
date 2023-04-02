import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditDepartment = (props) => {
  const { token } = props;
  const { id } = useParams();

  const [department, setDepartment] = useState({
    name: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadDepartment();
  }, []);

  const loadDepartment = async () => {
    const result = await axios.get(
      `http://localhost:9191/api/v1/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setDepartment({
      name: result.data.name,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:9191/api/v1/department/update/${id}`,
      {
        name: department.name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    navigate("/department");
  };

  const onInputChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const handleCancel = (e) => {
    navigate("/department");
  };

  return (
    <>
      <br />
      <h4 className="text-center mt-2">Update Department</h4>
      <br />
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
                value={department.name}
                onChange={(e) => onInputChange(e)}
              />
              <div class="invalid-feedback" style={{color:'salmon'}}>Department name is required.</div>
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
