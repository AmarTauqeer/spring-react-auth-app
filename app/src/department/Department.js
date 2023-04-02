import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";

export const Department = (props) => {
  const { token } = props;
  const [departments, setDepartments] = useState([]);
  // for search
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.dept_id,
      sortable: true,
      selector: (row) => row.dept_id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Link
            className="btn btn-sm btn-outline-primary mx-2"
            to={`/editdepartment/${row.dept_id}`}
          >
            <Icon.PencilSquare />
          </Link>
          <button
            className="btn btn-sm btn-outline-danger mx-2"
            onClick={(e) => handleDelete(row.dept_id)}
          >
            <Icon.Trash />
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const result = await axios.get("http://localhost:9191/api/v1/department", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDepartments(result.data);
  };

  const filteredItems = departments.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	);
  

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}

      />
    );
  }, [filterText, resetPaginationToggle]);

  const handleDelete = async (id) => {
    const result = await axios.delete(
      `http://localhost:9191/api/v1/department/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    loadDepartments();
  };

  return (
    <>
      <br />
      <h4 className="text-center">List of Departments</h4>
      <br />
      <Link className="btn btn-sm btn-outline-primary mx-2" to={`/addDepartment`}>
        <Icon.PlusCircle /> Add
      </Link>
      
      <DataTable
        columns={columns}
        data={filteredItems}
			pagination
			paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			selectableRows
			persistTableHead
      />
      {/* <Link className="btn btn-outline-primary mx-2" to={`/addDepartment`}>
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, index) => (
                <tr key={index}>
                  <td className="col-form-label-sm">{department.dept_id}</td>
                  <td className="col-form-label-sm">{department.name}</td>
                  <td className="col-form-label-sm">
                    <Link
                      className="btn btn-sm btn-outline-primary mx-2"
                      to={`/editdepartment/${department.dept_id}`}
                    >
                      <Icon.PencilSquare />
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger mx-2"
                      onClick={(e) => handleDelete(department.dept_id)}
                    >
                      <Icon.Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
};
export default Department;
