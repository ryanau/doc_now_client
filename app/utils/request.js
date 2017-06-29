import 'whatwg-fetch';

const DEFAULT_HEADERS = {
  Accept: 'application/json, */*',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

function setHeaders() {
  return {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    expiry: localStorage.getItem('expiry'),
    uid: localStorage.getItem('uid'),
  };
}

// Check to see if there is a response body
const testResponseHeader = (res) => res.headers.get('content-type').includes('charset=utf-8');

function setLocalStorage(res) {
  if (!res.headers.get('uid')) return null;
  const items = ['access-token', 'client', 'expiry', 'uid'];
  const itemsSet = items.map((i) => res.headers.get(i));
  return items.forEach((item, i) => {
    localStorage.setItem(item, itemsSet[i]);
  });
}

function checkStatus(response, responseJson = null) {
  if (response.status >= 200 && response.status < 300) {
    if (responseJson.resource) {
      return responseJson.resource;
    }
    return responseJson;
  }
  // if (response.status === 401) {
  //   return setTimeout(() => {
  //     // apiRequests.redirect('/redirect');
  //   }, 3000);
  // }
  // if (response.status >= 500) {
  // }
  const error = new Error(response.statusText);
  error.response = response;
  error.responseJson = responseJson;
  throw error;
}

function getOptions(method, headers = {}, body = null) {
  const options = {
    method,
    headers: Object.assign({}, DEFAULT_HEADERS, headers, setHeaders()),
  };

  if (body) {
    options.body = body;
  }
  return options;
}

function handleResponse(response) {
  let resp;
  return response
    .then((res) => {
      // We need to do this weird thing because calling the .json() function on the
      // http response returns a promise itself.
      resp = res;

      setLocalStorage(res);
      if (testResponseHeader(res)) {
        return res.json();
      }
      return res;
    })
    .then((res) => {
      let resJson;
      if (testResponseHeader(resp)) {
        resJson = res;
      }
      return checkStatus(resp, resJson);
    });
}

function stringifyQueryParams(queryParams) {
  return `?${Object.keys(queryParams)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&')}`;
}

export function get(url, params) {
  const urlToFetch = params ? url + stringifyQueryParams(params) : url;
  return handleResponse(fetch(urlToFetch, getOptions('GET', {})));
}

export function post(url, params) {
  const urlToFetch = params ? url + stringifyQueryParams(params) : url;
  return handleResponse(fetch(urlToFetch, getOptions('POST', {}, JSON.stringify(params))));
}

export function put(url, params) {
  const urlToFetch = params ? url + stringifyQueryParams(params) : url;
  return handleResponse(fetch(urlToFetch, getOptions('PUT', {}, JSON.stringify(params))));
}

export function de(url, params) {
  const urlToFetch = params ? url + stringifyQueryParams(params) : url;
  return handleResponse(fetch(urlToFetch, getOptions('DELETE', {}, JSON.stringify(params))));
}

