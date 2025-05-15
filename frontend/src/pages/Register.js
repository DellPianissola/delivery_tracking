import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Paper, Divider } from '@mui/material';
import CustomTextField from '../components/CustomTextField';
import { createDelivery } from '../api/delivery';
import { useTheme } from '@mui/material/styles';


function Register() {
  const navigate = useNavigate();
  const theme = useTheme();

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

    await createDelivery(dataToSend);
    alert('Delivery registered!');
    navigate('/deliveries');
  };

  return (
    <>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <Typography variant="h6">Rastreio de Entregas</Typography>
        </Toolbar>
      </AppBar>

      {/* Form Container */}
      <Box sx={{ padding: 4, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, margin: '0 auto', backgroundColor: theme.palette.primary.main }}>
          <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
            Registre a Entrega
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Customer Info */}
              <Grid size={12}>
                <CustomTextField fullWidth required name="customerName" label="Nome do Consumidor" value={form.customerName} onChange={handleChange} />
              </Grid>
              <Grid size={12}>
                <CustomTextField fullWidth required name="deliveryDate" type="date" label="Data da Entrega" InputLabelProps={{ shrink: true }} value={form.deliveryDate} onChange={handleChange} />
              </Grid>

              <Grid size={12}><Divider sx={{ marginY: 2, color: theme.palette.text.primary }}><strong>Origem</strong></Divider></Grid>

              {/* Origin Address */}
              <Grid size={4}>
                <CustomTextField fullWidth name="originCep" label="CEP" value={form.originCep} onChange={handleChange} onBlur={() => fetchAddress(form.originCep, 'origin')} />
              </Grid>
              <Grid size={8}>
                <CustomTextField fullWidth name="originStreet" label="Rua" value={form.originStreet} onChange={handleChange} />
              </Grid>
              <Grid size={4}>
                <CustomTextField fullWidth name="originNumber" label="Número" value={form.originNumber} onChange={handleChange} />
              </Grid>
              <Grid size={4}>
                <CustomTextField fullWidth name="originNeighborhood" label="Bairro" value={form.originNeighborhood} onChange={handleChange} />
              </Grid>
              <Grid size={4}>
                <CustomTextField fullWidth name="originCity" label="Cidade" value={form.originCity} onChange={handleChange} />
              </Grid>
              <Grid size={4}>
                <CustomTextField fullWidth name="originState" label="Estado" value={form.originState} onChange={handleChange} />
              </Grid>

              <Grid size={12}><Divider sx={{ marginY: 2, color: theme.palette.text.primary }}><strong>Destino</strong></Divider></Grid>

              {/* Destination Address */}
              <Grid size={4}>
                <CustomTextField fullWidth name="destinationCep" label="CEP" value={form.destinationCep} onChange={handleChange} onBlur={() => fetchAddress(form.destinationCep, 'destination')} />
              </Grid>
              <Grid size={8}>
                <CustomTextField fullWidth name="destinationStreet" label="Rua" value={form.destinationStreet} onChange={handleChange} />
              </Grid>
              <Grid size={4}>
                <CustomTextField fullWidth name="destinationNumber" label="Número" value={form.destinationNumber} onChange={handleChange} />
              </Grid>
              <Grid size={4}>
                <CustomTextField fullWidth name="destinationNeighborhood" label="Bairro" value={form.destinationNeighborhood} onChange={handleChange} />
              </Grid>
              <Grid size={4}>
                <CustomTextField fullWidth name="destinationCity" label="Cidade" value={form.destinationCity} onChange={handleChange} />
              </Grid>
              <Grid size={4}>
                <CustomTextField fullWidth name="destinationState" label="Estado" value={form.destinationState} onChange={handleChange} />
              </Grid>

              <Grid size={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ backgroundColor: theme.palette.secondary.main, marginTop: 2 }}>
                  Salvar Entrega
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
}

export default Register;
