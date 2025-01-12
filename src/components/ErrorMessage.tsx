import { Box, Button, Card, CardContent, Typography } from '@mui/material';

interface IErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<IErrorMessageProps> = ({ message, onRetry }) => {
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
          border: '1px solid #d32f2f',
        }}
      >
        <CardContent sx={{ p: '0 !important' }}>
          <Typography variant="h5" color="error" mb={2}>
            {message}
          </Typography>
          {onRetry && (
            <Button
              variant="contained"
              color="primary"
              onClick={onRetry}
              sx={{ textTransform: 'none' }}
            >
              Повторити спробу
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
