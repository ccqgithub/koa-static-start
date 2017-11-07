import axios from 'axios';
import qs from 'qs';

const api = axios.create({
  baseURL: `/`,
});

api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    let err = {
      errCode: error.response.status,
      errMsg: error.message,
      errInfo: null
    };

    try {
      let data = error.response.data;
      err.errCode = data.errCode;
      err.errMsg = data.errMsg;
      err.errInfo = data.errInfo;
    } catch(e) {
      err.errInfo = error.response.data;
    }

    return Promise.reject(err);
  });

api.postForm = (url, data) => {
  return api.post(url, qs.stringify(data), {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  });
}

/**
 * api
 */
export default api;
