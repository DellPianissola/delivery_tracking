// frontend/src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
  const [form, setForm] = useState({
    customerName: '',
    deliveryDate: '',
    origin: '',
    destination: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/deliveries', form);
    alert('Delivery registered!');
    navigate('/deliveries');
  };

  return (
    <div>
      <h2>Register Delivery</h2>
      <form onSubmit={handleSubmit}>
        <input name="customerName" placeholder="Customer Name" onChange={handleChange} required />
        <input name="deliveryDate" type="date" onChange={handleChange} required />
        <input name="origin" placeholder="Origin" onChange={handleChange} required />
        <input name="destination" placeholder="Destination" onChange={handleChange} required />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Register;
