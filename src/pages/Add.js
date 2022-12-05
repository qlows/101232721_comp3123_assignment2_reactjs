import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import "./Add.css"
import axios from "axios"
import { toast } from 'react-toastify';

const CreateEmployee = () => {
  
}

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  salary: "",
};

const Add = () => {
  const [state, setState] = useState(initialState)
  const { first_name, last_name, email, gender, salary } = initialState

  const nav = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleEmp(id)
    }
  }, [id])

  const getSingleEmp = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/emp/employees/${id}`)
    if (res.status === 200) {
      setState({ ...res.data[0] });
    }
  }

  const addEmployee = async (data) => {
    const res = await axios.post("http://localhost:8080/api/emp/employees", data);
    if (res.status === 200) {
      toast.success(res.data);
    }
  };

  const updateEmployee = async (data, id) => {
    const res = await axios.put(`http://localhost:8080/api/emp/employees/${id}`, data);
    if (res.status === 200) {
      toast.success(res.data);
    }
  };

  // Validation not working
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !email || !gender || !salary) {
      toast.error("Make sure all the fields are filled.")
    } else {
      if (!id) {
        addEmployee(state);
      } else {
        updateEmployee(state, id)
      }
      setTimeout(() => nav.push("/"), 500);
    }
  };
  /*   const handleSubmit = (e) => {
      e.preventDefault();
      addEmployee(state);
      setTimeout(() => nav.push("/"), 500);
    } */

  const handleInputChange = (e) => {
    let { first_name, defaultValue } = e.target;
    setState({ ...state, [first_name]: defaultValue })
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center", }}
        onSubmit={handleSubmit}
      >
        <label htmlFor='first_name'>First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="Enter first name: "
          onChange={handleInputChange}
          defaultValue={first_name}
        />
        <label htmlFor='last_name'>Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Enter last name: "
          onChange={handleInputChange}
          defaultValue={last_name}
        />
        <label htmlFor='email'>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email: "
          onChange={handleInputChange}
          defaultValue={email}
        />
        <label htmlFor='gender'>Gender</label>
        <input
          type="text"
          id="gender"
          name="gender"
          placeholder="Enter gender: "
          onChange={handleInputChange}
          defaultValue={gender}
        />
        <label htmlFor='salary'>Salary</label>
        <input
          type="number"
          id="salary"
          name="salary"
          placeholder="Enter salary: "
          onChange={handleInputChange}
          defaultValue={salary}
        />
        <input type="submit" defaultValue={id ? "Update" : "Add"}></input>
      </form>
    </div>
  )
}
export default Add