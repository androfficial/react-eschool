import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate } from 'react-router';

const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Box
      sx={{
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <CardContent sx={{ p: '0 !important' }}>
          <Typography variant="h5" gutterBottom>
            Щось пішло не так 😞
          </Typography>
          <Typography variant="body1" mb={2}>
            Виникла помилка: {error.message}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={resetErrorBoundary}
            sx={{ textTransform: 'none' }}
          >
            Спробувати знову
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleRetry = () => {
    navigate(pathname, { replace: true });
  };

  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onReset={handleRetry}>
      {children}
    </ReactErrorBoundary>
  );
};
