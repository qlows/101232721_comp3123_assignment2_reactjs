import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import axios from 'axios'
import "./View.css"

const View = () => {
    const [employee, setEmployee] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getSingleEmp(id)
        }
    }, [id])

    const getSingleEmp = async (id) => {
        const res = await axios.get(`http://localhost:8080/api/emp/employees/${id}`)
        if (res.status === 200) {
            setEmployee({ ...res.data[0] });
        }
    }

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='card'>
                <div className='card-header'>
                    <p>Employee Detail</p>
                </div>
                <div className='container'>
                    <strong>ID: </strong>
                    <span>{employee.id}</span>
                    <br />
                    <strong>First Name: </strong>
                    <span>{employee.first_name}</span>
                    <br />
                    <strong>Last Name: </strong>
                    <span>{employee.last_name}</span>
                    <br />
                    <strong>Email: </strong>
                    <span>{employee.email}</span>
                    <br />
                    <strong>Gender: </strong>
                    <span>{employee.gender}</span>
                    <br />
                    <strong>Salary: </strong>
                    <span>{employee.salary}</span>
                    <br />
                    <Link to="/">
                        <button className='btn btn-edit'>Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View