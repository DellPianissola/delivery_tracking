import React from 'react';
import { TextField } from '@mui/material';


const CustomTextField = (props) => {
  const baseColor = '#d1b6aa'; // tom abaixo do primary
  const hoverColor = '#f0eae6'; // tom claro para hover

  return (
    <TextField
      {...props}
      sx={{
        ...props.sx,
        input: { color: '#fff' },
        label: { color: '#fff' },
        '& label.Mui-focused': { color: hoverColor },
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: baseColor },
          '&:hover fieldset': { borderColor: hoverColor },
          '&.Mui-focused fieldset': { borderColor: hoverColor },
        },
      }}
    />
  );
};

export default CustomTextField;
