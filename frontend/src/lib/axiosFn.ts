import {
  DEV_API_END_POINT,
  ENV_NAME,
  PROD_API_END_POINT,
} from '@/const/env';
import aspida from '@aspida/axios';
import axios, { AxiosRequestConfig } from 'axios';
import api from '../../api/$api';

const apiUrl = (() => {
  if (ENV_NAME === 'dev') return DEV_API_END_POINT;
  return PROD_API_END_POINT;
})();

const config: AxiosRequestConfig = {
  baseURL: apiUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    function transformRequest(data) {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    function transformResponse(data) {
      return JSON.parse(data);
    },
  ],
};

const generateApiClient = (
  attachConfig: AxiosRequestConfig
) => {
  return api(aspida(axios, attachConfig));
};

/**
 * aspidaのclient
 */
export const apiClient = generateApiClient(config);
