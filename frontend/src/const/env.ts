export const ENV_NAME: 'dev' | 'prod' | '' =
  import.meta.env.VITE_ENV_NAME || '';

export const DEV_API_END_POINT: string =
  import.meta.env.VITE_APP_END_POINT || '';

export const PROD_API_END_POINT: string =
  import.meta.env.VITE_APP_END_POINT || '';
