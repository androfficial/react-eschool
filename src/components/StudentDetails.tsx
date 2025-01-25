import { Box, Button, Card, CardContent } from '@mui/material';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';

import { fetchStudents } from '@/api/students-services';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { StudentInfo } from '@/components/StudentInfo';
import { StudentNotFound } from '@/components/StudentNotFound';
import { IStudentModel } from '@/types/students-models';

export const StudentDetails: React.FC = () => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: student,
    isLoading,
    isError,
  } = useQuery<IStudentModel | undefined>(
    ['student', id],
    async () => {
      const students = await fetchStudents();
      return students.find((student) => student.Id === Number(id));
    },
    {
      enabled: Boolean(id),
    }
  );

  if (isLoading) {
    return <LoadingIndicator message="Інформація про студента завантажується" />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Сталася помилка при завантаженні даних про студента. Будь ласка, спробуйте пізніше."
        onRetry={() => queryClient.invalidateQueries(['students'])}
      />
    );
  }

  if (!student) return <StudentNotFound />;

  return (
    <Card sx={{ maxWidth: 600, padding: 3 }}>
      <CardContent>
        <StudentInfo student={student} />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
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
