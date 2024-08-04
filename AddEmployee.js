import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [contactMethods, setContactMethods] = useState([]);
    const navigate = useNavigate();

    const addContactMethod = () => {
        setContactMethods([...contactMethods, { method: '', value: '' }]);
    };

    const handleContactMethodChange = (index, field, value) => {
        const newContactMethods = [...contactMethods];
        newContactMethods[index][field] = value;
        setContactMethods(newContactMethods);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const employee = { name, address_line1: address, city, country, zip_code: zipCode, contactMethods };
        axios.post('http://localhost:9997/api/employees', employee)
            .then(response => {
                console.log('Employee added:', response.data);
                navigate('/');
            })
            .catch(error => {
                console.error('There was an error adding the employee!', error);
            });
    };

    return (
        <div className="form-container">
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address Line 1" required />
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required />
                <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="Zip Code" required />
                {contactMethods.map((contactMethod, index) => (
                    <div key={index}>
                        <select value={contactMethod.method} onChange={(e) => handleContactMethodChange(index, 'method', e.target.value)}>
                            <option value="EMAIL">Email</option>
                            <option value="PHONE">Phone</option>
                        </select>
                        <input type="text" value={contactMethod.value} onChange={(e) => handleContactMethodChange(index, 'value', e.target.value)} placeholder="Value" required />
                    </div>
                ))}
                <button type="button" onClick={addContactMethod}>Add Contact Method</button>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;
