import axios from 'axios';


const API_BASE = 'http://localhost:3001';


export const getDeliveries = () => axios.get(`${API_BASE}/deliveries`);
export const getDeliveryById = (id) => axios.get(`${API_BASE}/deliveries/${id}`);
export const createDelivery = (data) => axios.post(`${API_BASE}/deliveries`, data);
