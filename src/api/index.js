import axios from 'axios'

// axios.defaults.baseURL = 'http://127.0.0.1:3003'

axios.get = (url, params) => {
  return axios.request({
    url: url,
    method: 'get',
    params: params || {},
  })
};

// axios.interceptors.response.use(
//   response => {
//     let data = response.data
//     return data;
//   },
//   error => {
//     return Promise.reject({
//       errcode: error.response.status
//     })
//   }
// );

const test = {
  getList(params) {
    return axios.get(`/adminList`, {
      ...params,
    })
  },
};

export default {
  test
};