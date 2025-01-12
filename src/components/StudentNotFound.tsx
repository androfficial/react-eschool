import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

export const StudentNotFound: React.FC = () => {
  const navigate = useNavigate();

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
            Студента не знайдено
          </Typography>
          <Typography variant="body1" mb={2}>
            На жаль, ми не змогли знайти інформацію про цього студента.
            <br />
            Перевірте посилання або спробуйте ще раз.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
            sx={{ textTransform: 'none' }}
          >
            Повернутися назад
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
