import axios from 'axios';
import HttpStatus from 'http-status-codes';

import NetworkError from '../errors/network';

/**
 * Axios Object
 */
const http = axios.create();

http.interceptors.request.use(
  config => {
    return config;
  },
  function (error) {
    if (error.response) {
      return Promise.reject(error);
    } else {
      return Promise.reject(
        new NetworkError({
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        })
      );
    }
  }
);

export { http };
