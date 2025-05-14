import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: '',
    deliveryDate: '',

    originCep: '',
    originStreet: '',
    originNumber: '',
    originNeighborhood: '',
    originCity: '',
    originState: '',

    destinationCep: '',
    destinationStreet: '',
    destinationNumber: '',
    destinationNeighborhood: '',
    destinationCity: '',
    destinationState: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchAddress = async (cep, type) => {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf } = res.data;

      if (type === 'origin') {
        setForm((f) => ({
          ...f,
          originStreet: logradouro || '',
          originNeighborhood: bairro || '',
          originCity: localidade || '',
          originState: uf || '',
        }));
      } else {
        setForm((f) => ({
          ...f,
          destinationStreet: logradouro || '',
          destinationNeighborhood: bairro || '',
          destinationCity: localidade || '',
          destinationState: uf || '',
        }));
      }
    } catch (err) {
      alert('Erro ao buscar o endereço. Verifique o CEP.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const origin = `${form.originStreet}, ${form.originNumber}, ${form.originNeighborhood}, ${form.originCity} - ${form.originState}`;
    const destination = `${form.destinationStreet}, ${form.destinationNumber}, ${form.destinationNeighborhood}, ${form.destinationCity} - ${form.destinationState}`;

    const dataToSend = {
      customerName: form.customerName,
      deliveryDate: form.deliveryDate,
      origin,
      destination,
    };

    await axios.post('http://localhost:3001/deliveries', dataToSend);
    alert('Delivery registered!');
    navigate('/deliveries');
  };

  return (
    <div>
      <h2>Register Delivery</h2>
      <form onSubmit={handleSubmit}>
        <input name="customerName" placeholder="Customer Name" onChange={handleChange} required />
        <input name="deliveryDate" type="date" onChange={handleChange} required />

        <h4>Origin</h4>
        <input name="originCep" placeholder="CEP" value={form.originCep} onChange={handleChange} onBlur={() => fetchAddress(form.originCep, 'origin')} />
        <input name="originStreet" placeholder="Street" value={form.originStreet} onChange={handleChange} />
        <input name="originNumber" placeholder="Number" value={form.originNumber} onChange={handleChange} />
        <input name="originNeighborhood" placeholder="Neighborhood" value={form.originNeighborhood} onChange={handleChange} />
        <input name="originCity" placeholder="City" value={form.originCity} onChange={handleChange} />
        <input name="originState" placeholder="State" value={form.originState} onChange={handleChange} />

        <h4>Destination</h4>
        <input name="destinationCep" placeholder="CEP" value={form.destinationCep} onChange={handleChange} onBlur={() => fetchAddress(form.destinationCep, 'destination')} />
        <input name="destinationStreet" placeholder="Street" value={form.destinationStreet} onChange={handleChange} />
        <input name="destinationNumber" placeholder="Number" value={form.destinationNumber} onChange={handleChange} />
        <input name="destinationNeighborhood" placeholder="Neighborhood" value={form.destinationNeighborhood} onChange={handleChange} />
        <input name="destinationCity" placeholder="City" value={form.destinationCity} onChange={handleChange} />
        <input name="destinationState" placeholder="State" value={form.destinationState} onChange={handleChange} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Register;
