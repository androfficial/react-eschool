import { createTheme, Theme } from '@mui/material';

export const tableTheme: Theme = createTheme({
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: '2px solid #dcdfe4',
          padding: '10px',
        },
        head: {
          backgroundColor: '#f1f2f4',
          color: '#000000',
          fontWeight: '700',
        },
      },
    },
  },
});
