import React from 'react';
import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList.js';
import AddEmployee from './components/AddEmployee.js';
import EmployeeDetails from './components/EmployeeDetails.js';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EmployeeList />} />
                <Route path="/add" element={<AddEmployee />} />
                <Route path="/employees/:id" render={({ match }) => (
                <EmployeeDetails id={Number(match.params.id)} />
            )} />
            </Routes>
        </Router>
    );
};

export default App;
