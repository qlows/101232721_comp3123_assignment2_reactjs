import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./Home.css"
import axios from "axios"
import { toast } from 'react-toastify'

const Home = () => {
  const [EmployeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();

  const ViewEmployee = (id) => {
    navigate("/employee/view/" + id);
  }

  const EditEmployee = (id) => {
    navigate("/employee/edit/" + id);
  }

  const DeleteEmployee = (id) => {
    if (window.confirm('Do you want to delete the employee?')) {
      fetch("http://localhost:6000/api/emp/employees/" + id, {
        method: "DELETE"
      }).then((res) => {
        toast.success(res.data)
        ViewEmployee()
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }

  useEffect(() => {
    fetch("http://localhost:6000/api/emp/employees/").then((res) => {
      return res.json();
    }).then((res) => {
      setEmployeeData(res);
      // console.log(resp)
    }).catch((err) => {
      // console.log(err.message);
    })
  }, [])

  return (
    <div style={{ marginTop: "200px" }}>
      <table className='style-table'>
        <tr>
          <th style={{ textAlign: "center" }}>ID</th>
          <th style={{ textAlign: "center" }}>First Name</th>
          <th style={{ textAlign: "center" }}>Last Name</th>
          <th style={{ textAlign: "center" }}>Email</th>
          <th style={{ textAlign: "center" }}>Gender</th>
          <th style={{ textAlign: "center" }}>Salary</th>
        </tr>
      </table>

      <tbody>
        {EmployeeData && EmployeeData.map((item) => {

          <tr key={item.id}>
            {/* <th scope="row">{index + 1}</th> */}
            <td>{item.id}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>{item.salary}</td>
            <td>
              {/* <Link to={`/employees/${item.id}`}>
                <button className='btn btn-view'>View</button>
              </Link>
              <Link to={`/employees/${item.id}`}>
                <button className='btn btn-edit'>Update</button>
              </Link> */}
              <button className='btn btn-success' onClick={() => ViewEmployee(item.id)}>View</button>
              <button className='btn btn-success' onClick={() => EditEmployee(item.id)}>Edit</button>
              <button className='btn btn-delete' onClick={() => DeleteEmployee(item.id)}>Delete</button>
            </td>
          </tr>

        })}
      </tbody>
    </div>
  )

  const getEmployee = async () => {
    const res = await axios.get("http://localhost:8080/api/emp/employees");
    if (res.status === 200) {
      setEmployeeData(res.data);
    }
  }

}
export default Home