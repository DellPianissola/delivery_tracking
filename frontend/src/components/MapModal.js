// src/components/MapModal.js
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { getDeliveryById } from '../api/delivery';
import { useTheme } from '@mui/material/styles';


const containerStyle = {
  width: '100%',
  height: '500px',
};


function MapModal({ open, onClose, deliveryId }) {
  const [delivery, setDelivery] = useState(null);
  const [directions, setDirections] = useState(null);
  const theme = useTheme();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCc3Jz53EZFOP9xwemHbcEp9DwS6mFzwXY',
    libraries: ['places'],
  });


  useEffect(() => {
    if (!deliveryId || !isLoaded) return;

    getDeliveryById(deliveryId).then((res) => {
      setDelivery(res.data);

      const origin = `${res.data.originStreet}, ${res.data.originNumber}, ${res.data.originNeighborhood}, ${res.data.originCity}, ${res.data.originState}`;
      const destination = `${res.data.destinationStreet}, ${res.data.destinationNumber}, ${res.data.destinationNeighborhood}, ${res.data.destinationCity}, ${res.data.destinationState}`;

      const service = new window.google.maps.DirectionsService();
      service.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
          } else {
            console.error('Directions request failed:', status);
          }
        }
      );
    });
  }, [deliveryId, isLoaded]);


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ color: theme.palette.primary.main }}>
        Rota da Entrega
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {!isLoaded || !delivery || !directions ? (
          <CircularProgress />
        ) : (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={directions.routes[0].bounds.getCenter()}
            zoom={10}
          >
            <DirectionsRenderer directions={directions} />
          </GoogleMap>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default MapModal;
