import 'whatwg-fetch';

export const API_ROOT = 'http://172.28.29.13:8080/portal/';


const defaultOptions = {
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
};

function checkStatus(response) {
    const { status } = response;
    if (status >= 200 && status < 300) {
      return response;
    }
    const error = new Error();
    error.code = status;
    switch (status) {
      case 400:
        error.message = '请求参数错误';
        break;
      case 401:
        error.message = '未授权登录';
        break;
      case 403:
        error.message = '权限不足';
        break;
      case 404:
      case 408:
        error.message = '资源不存在';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
      default:
        error.message = '服务异常';
        break;
    }
    throw error;
  }
  
  function parseCode(res) {
    if (res.code) throw new Error(res.message);
    const data = res.data || ((res || {}).Response || {}).data;
    if (!data) {
      throw new Error();
    } else {
      return data;
    }
  }

/**
 * 发起数据请求
 * @param {string} url - 请求地址，不需要添加API前缀
 * @param {object} [option] - 请求参数
 */
export default function request(url, option) {
    const options = {
      ...defaultOptions,
      ...option,
    };
    // const signature = creatSignKey(url, options.body);
  
    if (options.method === 'POST' || options.method === 'PUT' || options.method === 'DELETE') {
      if (!(options.body instanceof FormData)) {
        options.headers = {
          Accept: 'application/json',
          // 使用自动识别
          // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Content-Type': 'application/json; charset=utf-8',
          ...options.headers,
        };
        options.body = JSON.stringify(options.body);
      } else {
        // options.body is FormData
        options.headers = {
          Accept: 'application/json',
          ...options.headers,
        };
      }
    }
  
  
    if (!/http(s)?:\/\/.+/.test(url) && !/^\/mocks/.test(url)) {
      // 请求地址不包括http、https时使用API地址
      // eslint-disable-next-line no-param-reassign
      url = `${API_ROOT.replace(/\/+$/g, '')}/${url.replace(/^\/+/g, '')}`;
    }
  
    const fetchPromise = fetch(url, options);
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const error = new Error();
        error.code = 'CLIENT_TIMEOUT';
        error.message = '请求超时，请稍后重试!';
        reject(error);
      }, 30000);
    });
  
    return Promise.race([fetchPromise, timeoutPromise])
      .then(checkStatus)
      .then((response) => {
        // 204 do not return data by default
        // using .json will report an error.
        if (response.status === 204) {
          return response.text();
        }
        return response.json();
      })
      .then(parseCode);
  }