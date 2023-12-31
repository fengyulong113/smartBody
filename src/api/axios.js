import axios from 'axios';

// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

function fetch(axiosConfig) {
  const service = axios.create({
    baseURL: "/",
    // timeout: 10000,
  });

  return service(axiosConfig)
}

export default fetch;
