import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9997/api/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the employees!', error);
            });
    }, []);

    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:9997/api/employees/${id}`)
            .then(response => {
                setEmployees(employees.filter(employee => employee.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the employee!', error);
            });
    };

    return (
        <div>
            <h1>Employee List</h1>
            {employees.length > 0 ? (
                <ul>
                    {employees.map(employee => (
                        <li key={employee.id}>
                            <Link to={`/employees/${employee.id}`}>{employee.name} (ID: {employee.id})</Link>
                            <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Employees in the system.</p>
            )}
            <Link to="/add">
                <button>Add Employee</button>
            </Link>
        </div>
    );
};

export default EmployeeList;
