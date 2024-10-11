import { Axios } from 'axios';

const isMockApiMode =
  process.env.NEXT_PUBLIC_MOCK_API_MODE === 'true';
const apiUrl = isMockApiMode
  ? process.env.NEXT_PUBLIC_MOCK_API_URL
  : 'https://submarine-server.com';
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
