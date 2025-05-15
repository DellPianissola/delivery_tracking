// src/theme/theme.js
import { createTheme } from '@mui/material/styles';
import themeColors from './colors';


const theme = createTheme({
  palette: {
    primary: {
      main: themeColors.primary,
      contrastText: themeColors.text,
    },
    secondary: {
      main: themeColors.secondary,
      contrastText: themeColors.text,
    },
    background: {
      default: themeColors.background,
    },
    text: {
      primary: themeColors.text,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: themeColors.lightBrown,
            },
            '&:hover fieldset': {
              borderColor: themeColors.hoverAccent,
            },
            '&.Mui-focused fieldset': {
              borderColor: themeColors.accent,
            },
          },
          '& .MuiInputLabel-root': {
            color: themeColors.accent,
          },
          '& .MuiInputBase-input': {
            color: themeColors.accent,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: themeColors.lightBrown,
          color: themeColors.text,
          '&:hover': {
            backgroundColor: themeColors.hoverAccent,
            color: themeColors.secondary,
          },
        },
      },
    },
  },
});

export default theme;
