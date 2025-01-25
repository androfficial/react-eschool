import { createTheme, Theme } from '@mui/material';

export const tableTheme: Theme = createTheme({
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--background-root-color)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: `2px solid var(--border-cell-color)`,
        },
        head: {
          backgroundColor: 'var(--background-head-color)',
          color: 'var(--text-head-color)',
          fontWeight: 700,
        },
      },
    },
  },
});
