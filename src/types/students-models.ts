export interface IStudentColumnData {
  studentId: number;
  columnId: number;
}

export interface IStudentModel {
  Id: number;
  FirstName: string | null;
  SecondName: string | null;
  LastName: string | null;
}

export interface IStudentsModel {
  Items: IStudentModel[];
  Quantity: number;
}

export interface IColumnModel {
  Id: number;
  Title: string;
}

export interface IColumnsModel {
  Items: IColumnModel[];
  Quantity: number;
}

export interface IAbsenceModel {
  Id: number;
  Title: string; // "H"
  SchoolboyId: number;
  ColumnId: number;
  Quantity: number;
}

export interface IAbsencesModel {
  Items: IAbsenceModel[];
  Quantity: number;
}
