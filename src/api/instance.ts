import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import { localStorageService } from '@/services/localStorageService';
import { LocalStorageKeys } from '@/services/types';

export const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_CLASS_KEY}`,
  headers: {
    'Accept-Language': 'en',
  },
});

api.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const token = localStorageService.getItem(LocalStorageKeys.AuthToken);
    const language = localStorageService.getItem(LocalStorageKeys.Language);

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    if (language) {
      request.headers['Accept-Language'] = language;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (!error.response) {
      toast.error(
        'Не вдалося підключитися до сервера. Це може бути пов’язано з проблемами CORS або мережею.'
      );
    } else {
      const status = error.response?.status;
      if (status) {
        switch (status) {
          case 404:
            toast.error(`Ресурс не знайдено.\nПеревірте адресу або спробуйте пізніше.`);
            break;
          case 500:
            toast.error(`Внутрішня помилка сервера.\nБудь ласка, спробуйте пізніше.`);
            break;
          default:
            toast.error(`Сталася помилка.\nКод статусу: ${status}`);
        }
      } else {
        toast.error(`Немає відповіді від сервера.\nПеревірте з’єднання.`);
      }
    }
    return Promise.reject(error);
  }
);
