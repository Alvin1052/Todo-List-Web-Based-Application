import axios from 'axios';

const headers = {
  accept: 'application/json',
  apikey: '0ICVyrNhPL56Oss58qv-_y42PhSQvYcPm6Vz26j4bNw',
  'Content-Type': 'application/json',
};

const axiosInstance = () => {
  const baseURL = 'http://localhost:8080';

  const instance = axios.create({
    baseURL,
    headers,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error', error);
      return Promise.reject(error);
    }
  );
  return instance;
};

export default axiosInstance;
