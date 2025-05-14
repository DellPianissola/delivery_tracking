// frontend/src/pages/List.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function List() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/deliveries')
      .then(res => setDeliveries(res.data));
  }, []);

  return (
    <div>
      <h2>Delivery List</h2>
      <ul>
        {deliveries.map(delivery => (
          <li key={delivery.id}>
            <strong>{delivery.customerName}</strong> – {delivery.deliveryDate}
            <br />
            From: {delivery.origin} | To: {delivery.destination}
            <br />
            <Link to={`/map/${delivery.id}`}>View on Map</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
