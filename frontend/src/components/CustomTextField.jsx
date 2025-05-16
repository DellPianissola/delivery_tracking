import React from 'react';
import { TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const CustomTextField = (props) => {
  const hoverColor = '#f0eae6'; 
  const theme = useTheme();// tom claro para hover

  return (
    <TextField
      {...props}
      sx={{
        ...props.sx,
        backgroundColor: theme.palette.custom.rowDark,
        input: { color: theme.palette.primary.contrastText },
        label: { color: theme.palette.primary.contrastText },
        '& label.Mui-focused': { color: hoverColor },
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: theme.palette.custom.outline },
          '&:hover fieldset': { borderColor: theme.palette.custom.hoverOutline },
          '&.Mui-focused fieldset': { borderColor: theme.palette.custom.hoverOutline },
        },
      }}
    />
  );
};

export default CustomTextField;
