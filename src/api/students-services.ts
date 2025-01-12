import { api } from '@/api/instance';
import {
  IAbsenceModel,
  IAbsencesModel,
  IColumnModel,
  IColumnsModel,
  IStudentColumnData,
  IStudentModel,
  IStudentsModel,
} from '@/types/students-models';

export const fetchStudents = async (): Promise<IStudentModel[]> => {
  const { data } = await api.get<IStudentsModel>('/Schoolboy');
  return data.Items;
};

export const fetchColumns = async (): Promise<IColumnModel[]> => {
  const { data } = await api.get<IColumnsModel>('/Column');
  return data.Items;
};

export const fetchAbsences = async (schoolboyId?: number): Promise<IAbsenceModel[]> => {
  const params = schoolboyId ? { SchoolboyId: schoolboyId } : {};
  const { data } = await api.get<IAbsencesModel>('/Rate', { params });
  return data.Items;
};

export const addAbsenceForStudent = async (model: IStudentColumnData): Promise<void> => {
  return await api.post('/Rate', {
    SchoolboyId: model.studentId,
    ColumnId: model.columnId,
    Title: 'H',
  });
};

export const removeAbsenceForStudent = async (model: IStudentColumnData): Promise<void> => {
  return await api.post('/UnRate', {
    SchoolboyId: model.studentId,
    ColumnId: model.columnId,
  });
};
