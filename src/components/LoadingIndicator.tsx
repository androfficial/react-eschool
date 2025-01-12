import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface ILoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator: React.FC<ILoadingIndicatorProps> = ({
  message = 'Завантажується',
}) => {
  const [dots, setDots] = useState<string>('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h5" sx={{ mt: 2 }}>
        {message}
        {dots}
      </Typography>
    </Box>
  );
};
