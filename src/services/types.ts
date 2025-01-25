export enum LocalStorageKeys {
  AuthToken = 'authToken',
  Language = 'language',
}

export type TLocalStorageValue = string | null;

export interface ILocalStorageService {
  getItem: (key: LocalStorageKeys) => TLocalStorageValue;
  setItem: (key: LocalStorageKeys, value: string) => void;
  removeItem: (key: LocalStorageKeys) => void;
  clear: () => void;
}
