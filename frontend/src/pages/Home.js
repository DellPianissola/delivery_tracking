import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';


function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw'
      }}
    >
      <Box
        sx={{
          width: '70%',
          backgroundImage: 'url(/map_compass.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box
        sx={{
          width: '30%',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: 4,
            borderRadius: 2,
            maxWidth: 300,
            color: theme.palette.primary.contrastText,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Bem Vindo!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Rastreie suas encomendas de forma descomplicada.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/deliveries')}
            sx={{
              marginTop: 2,
              backgroundColor: theme.palette.background.default,
              color: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText },
            }}
          >
            Enter
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
