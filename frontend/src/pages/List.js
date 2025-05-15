// frontend/src/pages/List.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDeliveries } from '../api/delivery';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MapModal from '../components/MapModal';
import { useNavigate } from 'react-router-dom';


function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);
  const theme = useTheme();
  const [openMapId, setOpenMapId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getDeliveries().then((res) => setDeliveries(res.data));
  }, []);

  return (
    <>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <Typography variant="h6">Lista de Entregas</Typography>
        </Toolbar>
      </AppBar>

      {/* Tabela de Entregas */}
      <Box sx={{ padding: 4, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Paper elevation={3} sx={{ padding: 2, maxWidth: '95%', margin: '0 auto', backgroundColor: theme.palette.primary.main }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
            Entregas Registradas
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate('/register')}
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.common.white,
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
            >
              Nova Entrega
            </Button>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Cliente</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Data</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Origem</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Destino</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deliveries.map((delivery) => (
                  <TableRow key={delivery.id} sx={{ backgroundColor: theme.palette.secondary.main }}>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{delivery.customerName}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{delivery.deliveryDate}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{delivery.origin}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{delivery.destination}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setOpenMapId(delivery.id)}
                        sx={{
                          borderColor: theme.palette.text.primary,
                          color: theme.palette.text.primary,
                          '&:hover': {
                            backgroundColor: '#ffffff22',
                            borderColor: '#fff',
                          },
                        }}
                      >
                        Ver no Mapa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <MapModal open={!!openMapId} onClose={() => setOpenMapId(null)} deliveryId={openMapId} />
    </>
  );
}

export default DeliveryList;
