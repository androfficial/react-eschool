import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
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
        <Typography variant="h5">Сторінка не знайдена</Typography>
        <Typography variant="body1" mb={2}>
          Вибачте, але сторінка, яку ви шукаєте, не існує.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ textTransform: 'none' }}
        >
          На головну
        </Button>
      </CardContent>
    </Card>
  );
};
