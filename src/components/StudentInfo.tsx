import { Typography } from '@mui/material';

import { IStudentModel } from '@/types/students-models';

interface IStudentInfoProps {
  student: IStudentModel;
}

export const StudentInfo: React.FC<IStudentInfoProps> = ({ student }) => (
  <>
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
  </>
);
