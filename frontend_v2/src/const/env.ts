export const ENV_NAME: 'local' | 'dev' | 'prod' = import.meta.env.VITE_ENV_NAME || '';

export const API_END_POINT: string = import.meta.env.VITE_API_END_POINT || '';

export const GCP_CLIENT_ID: string = import.meta.env.VITE_GCP_CLIENT_ID || '';

export const GCP_REDIRECT_URI: string = import.meta.env.VITE_GCP_REDIRECT_URI || '';
