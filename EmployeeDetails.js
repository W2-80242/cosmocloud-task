import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const EmployeeDetails = ({ id }) => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Employee ID:', id);
        if (id) {
            const fetchEmployeeDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:9997/api/employees/${id}`);
                    setEmployee(response.data);
                } catch (err) {
                    setError('Failed to fetch employee details');
                } finally {
                    setLoading(false);
                }
            };
        
            fetchEmployeeDetails();
        } else {
            setLoading(false);
            setError('No employee ID provided');
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!employee) return <p>No employee found</p>;

    return (
        <div>
            <h1>{employee.name}</h1>
            <p>Address: {employee.address_line1}</p>
            <p>City: {employee.city}</p>
            <p>Country: {employee.country}</p>
            <p>Zip Code: {employee.zip_code}</p>
            <h2>Contact Methods</h2>
            <ul>
                {(employee.contactMethods || []).map((method, index) => (
                    <li key={index}>
                        {method.method}: {method.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

EmployeeDetails.propTypes = {
    employeeId: PropTypes.number.isRequired,
};

export default EmployeeDetails;
