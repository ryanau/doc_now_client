const api = (process.env.NODE_ENV === 'production' ? 'https://doctor-now-api.herokuapp.com' : 'http://localhost:3000/');
const wsApi = api.replace(/http.+\/\//i, 'ws://');

const apiEndpoints = {
  doctors: {
    collection: `${api}doctors`,
  },
  bookings: {
    create: `${api}bookings`,
  },
  websocket: `${wsApi}cable/`,
};

export default apiEndpoints;

