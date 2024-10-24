import { APP_END_POINT } from '@/const/env';
import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: APP_END_POINT,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [
    function transformResponse(data) {
      return JSON.parse(data);
    },
  ],
};

export const apiClient = axios.create(config);
