import React, { useEffect, useState } from 'react';
import { getDeliveries } from '../api/delivery';
import { AppBar, Toolbar, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Button} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MapModal from '../components/MapModal';
import { useNavigate } from 'react-router-dom';
import MapIcon from '@mui/icons-material/Map';
import { IconButton, Tooltip } from '@mui/material';



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
      <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <Typography variant="h6">Lista de Entregas</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 4, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Paper elevation={3} sx={{ padding: 2, maxWidth: '95%', margin: '0 auto', backgroundColor: theme.palette.primary.main }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
            Entregas Registradas
            </Typography>
            <Button
              variant="contained"
              size="medium"
              onClick={() => navigate('/register')}
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark,
                  color: theme.palette.secondary.contrastText,
                },
              }}
            >
              Nova Entrega
            </Button>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{backgroundColor: theme.palette.secondary.main, '& td, & th': { borderBottom: 'none' }}}>
                  <TableCell align="center" sx={{ color: theme.palette.text.primary }}>Cliente</TableCell>
                  <TableCell align="center" sx={{ color: theme.palette.text.primary }}>Data</TableCell>
                  <TableCell align="center" sx={{ color: theme.palette.text.primary }}>Origem</TableCell>
                  <TableCell align="center" sx={{ color: theme.palette.text.primary }}>Destino</TableCell>
                  <TableCell align="center" sx={{ color: theme.palette.text.primary }}></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {deliveries.map((delivery, index) => (
                  <TableRow
                    key={delivery.id}
                    sx={{
                      backgroundColor: index % 2 === 0
                        ? theme.palette.custom?.rowLight || '#9e7c6d'
                        : theme.palette.custom?.rowDark || '#7c5a48',
                      '& td, & th': { borderBottom: 'none' },
                    }}
                  >
                    <TableCell align="center" sx={{ color: theme.palette.text.primary }}>{delivery.customerName}</TableCell>
                    <TableCell align="center" sx={{ color: theme.palette.text.primary }}>{delivery.deliveryDate}</TableCell>
                    <TableCell align="center" sx={{ color: theme.palette.text.primary }}>{delivery.origin}</TableCell>
                    <TableCell align="center" sx={{ color: theme.palette.text.primary }}>{delivery.destination}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Ver no Mapa">
                        <IconButton
                          onClick={() => setOpenMapId(delivery.id)}
                          sx={{
                            color: theme.palette.text.primary,
                            '&:hover': {
                              backgroundColor: '#ffffff22',
                            },
                          }}
                        >
                          <MapIcon />
                        </IconButton>
                      </Tooltip>
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
