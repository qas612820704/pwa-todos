import AXIOS from 'axios';
import 'axios-debug-log';
import { SERVER } from '../../config';

const axios = AXIOS.create({
  baseURL: SERVER.apiPrefix,
});

export function setHeaders(headers) {
  axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    ...headers,
  }
}


export default axios;
