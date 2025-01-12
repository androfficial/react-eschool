import { Box } from '@mui/material';
import { Outlet } from 'react-router';

export const CenteredLayout: React.FC = () => {
  return (
    <Box
      sx={{
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Outlet />
    </Box>
  );
};
