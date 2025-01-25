import { Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider } from '@mui/material';
import React, { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router';

import {
  addAbsenceForStudent,
  fetchAbsences,
  fetchColumns,
  fetchStudents,
  removeAbsenceForStudent,
} from '@/api/students-services';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { tableTheme } from '@/themes/tableTheme';
import { IAbsenceModel } from '@/types/students-models';

export const StudentsTable: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    data: students,
    isLoading: studentsLoading,
    isError: studentsError,
  } = useQuery('students', fetchStudents);

  const {
    data: columns,
    isLoading: columnsLoading,
    isError: columnsError,
  } = useQuery('columns', fetchColumns);

  const {
    data: absences,
    isLoading: absencesLoading,
    isError: absencesError,
  } = useQuery('absences', () => fetchAbsences());

  const addAbsenceMutation = useMutation(addAbsenceForStudent, {
    onMutate: async ({ studentId, columnId }) => {
      await queryClient.cancelQueries('absences');
      const previousAbsences = queryClient.getQueryData<IAbsenceModel[]>('absences');

      queryClient.setQueryData<IAbsenceModel[]>('absences', (old) => [
        ...(old || []),
        {
          Id: Math.random(),
          SchoolboyId: studentId,
          ColumnId: columnId,
          Title: 'H',
          Quantity: 1,
        },
      ]);

      return {
        previousAbsences,
      };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData('absences', context?.previousAbsences);
    },
    onSettled: () => {
      queryClient.invalidateQueries('absences');
    },
  });

  const removeAbsenceMutation = useMutation(removeAbsenceForStudent, {
    onMutate: async ({ studentId, columnId }) => {
      await queryClient.cancelQueries('absences');
      const previousAbsences = queryClient.getQueryData<IAbsenceModel[]>('absences');

      queryClient.setQueryData<IAbsenceModel[]>('absences', (old) =>
        (old || []).filter(
          (absence) => !(absence.SchoolboyId === studentId && absence.ColumnId === columnId)
        )
      );

      return {
        previousAbsences,
      };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData('absences', context?.previousAbsences);
    },
    onSettled: () => {
      queryClient.invalidateQueries('absences');
    },
  });

  const handleAbsence = (studentId: number, columnId: number, isCurrentlyAbsent: boolean) => {
    if (isCurrentlyAbsent) {
      removeAbsenceMutation.mutate({ studentId, columnId });
    } else {
      addAbsenceMutation.mutate({ studentId, columnId });
    }
  };

  const isAbsent = useMemo(
    () => (studentId: number, columnId: number) =>
      absences?.some(
        (absence) => absence.SchoolboyId === studentId && absence.ColumnId === columnId
      ) ?? false,
    [absences]
  );

  if (studentsLoading || columnsLoading || absencesLoading) {
    return <LoadingIndicator message="Таблиця студентів завантажується" />;
  }

  if (studentsError || columnsError || absencesError) {
    return (
      <ErrorMessage
        message="Сталася помилка при завантаженні даних про таблицю студентів. Будь ласка, спробуйте пізніше."
        onRetry={() => queryClient.invalidateQueries()}
      />
    );
  }

  return (
    <ThemeProvider theme={tableTheme}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>Ім’я учня</TableCell>
            {columns?.map((column) => <TableCell key={column.Id}>{column.Title}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {students?.map((student, index) => (
            <TableRow key={student.Id}>
              <TableCell>
                <Link to={`/student/${student.Id}`}>{index + 1}</Link>
              </TableCell>
              <TableCell>
                <Link to={`/student/${student.Id}`}>
                  {[student.LastName, student.FirstName, student.SecondName]
                    .filter(Boolean)
                    .join(' ')}
                </Link>
              </TableCell>
              {columns?.map((column) => (
                <TableCell
                  key={column.Id}
                  onClick={() =>
                    handleAbsence(student.Id, column.Id, isAbsent(student.Id, column.Id))
                  }
                  sx={{ cursor: 'pointer' }}
                >
                  {isAbsent(student.Id, column.Id) ? 'H' : ''}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ThemeProvider>
  );
};
