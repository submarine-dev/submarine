import { API_END_POINT } from '@/const/env';
import aspida from '@aspida/axios';
import axios, { type AxiosRequestConfig } from 'axios';
import api from '../../api/$api';

const config: AxiosRequestConfig = {
  baseURL: API_END_POINT,
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

const generateApiClient = (attachConfig: AxiosRequestConfig) => {
  return api(aspida(axios, attachConfig));
};

/**
 * aspidaのclient
 */
export const apiClient = generateApiClient(config);
