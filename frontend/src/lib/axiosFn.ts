import {
  DEV_API_END_POINT,
  ENV_NAME,
  PROD_API_END_POINT,
} from '@/const/env';
import { Axios } from 'axios';

const apiUrl = (() => {
  if (ENV_NAME === 'dev') return DEV_API_END_POINT;
  return PROD_API_END_POINT;
})();

export const axiosFn = new Axios({
  baseURL: apiUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [
    function transformResponse(data) {
      return JSON.parse(data);
    },
  ],
  transformRequest: [
    function transformRequest(data) {
      return JSON.stringify(data);
    },
  ],
});
