import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2', // You can adjust to match your brand
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#181818',
      paper: '#232323',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h1: { fontSize: '2.2rem', fontWeight: 700 },
    h2: { fontSize: '1.8rem', fontWeight: 600 },
    h3: { fontSize: '1.4rem', fontWeight: 500 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.9rem' },
  },
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme; 