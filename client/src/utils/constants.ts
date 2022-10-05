export const serverUrl: string =
  process.env.NODE_ENV === 'production' ? '' : import.meta.env.VITE_SERVER_URL || 'http://localhost:8000';

export const timeout = 300;
