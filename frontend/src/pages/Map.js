// frontend/src/pages/Map.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '500px'
};


function Map() {
  const { id } = useParams();
  const [delivery, setDelivery] = useState(null);
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCc3Jz53EZFOP9xwemHbcEp9DwS6mFzwXY', // ← coloque sua key aqui
    libraries: ['places']
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/deliveries/${id}`)
      .then(res => {
        setDelivery(res.data);
        if (isLoaded) {
          const service = new window.google.maps.DirectionsService();
          service.route(
            {
              origin: res.data.origin,
              destination: res.data.destination,
              travelMode: window.google.maps.TravelMode.DRIVING
            },
            (result, status) => {
              if (status === 'OK') {
                setDirections(result);
              } else {
                console.error('Directions request failed:', status);
              }
            }
          );
        }
      });
  }, [id, isLoaded]);

  if (!isLoaded || !delivery) return <p>Loading map...</p>;

  return (
    <div>
      <h2>Delivery Route</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 0, lng: 0 }}
        zoom={2}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}

export default Map;
