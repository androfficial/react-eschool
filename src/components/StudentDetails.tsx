import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';

import { fetchStudents } from '@/api/students-services';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { StudentNotFound } from '@/components/StudentNotFound';
import { IStudentModel } from '@/types/students-models';

export const StudentDetails: React.FC = () => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: students, isLoading, isError: studentsError } = useQuery('students', fetchStudents);
  const student = students?.find((student: IStudentModel) => student.Id === Number(id));

  if (isLoading) return <LoadingIndicator message="Інформація про студента завантажується" />;

  if (studentsError) {
    return (
      <ErrorMessage
        message="Сталася помилка при завантаженні даних про студента. Будь ласка, спробуйте пізніше."
        onRetry={() => queryClient.invalidateQueries()}
      />
    );
  }

  if (!student) return <StudentNotFound />;

  return (
    <Card sx={{ maxWidth: 600, padding: '20px' }}>
      <CardContent sx={{ p: '0 !important' }}>
        <Typography variant="h4" gutterBottom>
          Інформація про студента
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Прізвище:</strong> {student.LastName || 'Не вказано'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Ім’я:</strong> {student.FirstName || 'Не вказано'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>По-батькові:</strong> {student.SecondName || 'Не вказано'}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
            sx={{ textTransform: 'none' }}
          >
            Назад
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
