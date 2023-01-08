import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../pages/Login';

const index = () => {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default index;