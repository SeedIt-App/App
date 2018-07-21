import axios from 'axios';
import { API_BASE_URL } from './config';

export function GET(location) {
  console.log('API GET: ', location);
  return axios
    .get(location)
    .then(response => {
      console.log('Resolved', response);
      return { response };
    })
    .catch(error => {
      console.log('Rejected', error.response, error.message, error);
      throw error.response || error.message || 'NETWORK ERROR';
    });
}

export function POST(location, body) {
  console.log('API POST: ', location);
  return axios
    .post(location, body)
    .then(response => {
      console.log('Resolved', response);
      return { response };
    })
    .catch(error => {
      console.log('Rejected', error.response, error.message, error);
      throw error.response || error.message || 'NETWORK ERROR';
    });
}

export function PUT(location, body) {
  console.log('API PUT: ', location);
  return axios
    .put(location, body)
    .then(response => {
      console.log('Resolved', response);
      return { response };
    })
    .catch(error => {
      console.log('Rejected', error.response, error.message, error);
      throw error.response || error.message || 'NETWORK ERROR';
    });
}

export function PATCH(location, body) {
  console.log('API PATCH: ', location);
  return axios
    .patch(location, body)
    .then(response => {
      console.log('Resolved', response);
      return { response };
    })
    .catch(error => {
      console.log('Rejected', error.response, error.message, error);
      throw error.response || error.message || 'NETWORK ERROR';
    });
}

export function DELETE(location, body) {
  console.log('API DELETE: ', location);
  return axios
    .delete(location, body)
    .then(response => {
      console.log('Resolved', response);
      return { response };
    })
    .catch(error => {
      console.log('Rejected', error.response, error.message, error);
      throw error.response || error.message || 'NETWORK ERROR';
    });
}

axios.defaults.baseURL = API_BASE_URL;

export function setAuthHeaders(authToken) {
  console.log(authToken, 'authToken');
  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
}
