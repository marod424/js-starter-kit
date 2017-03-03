import 'whatwg-fetch';
import getBaseUrl from './base-url';

const baseUrl = getBaseUrl();

export function getitems() {
  return get('items');
}

export function deleteitem(id) {
  return del(`items/${id}`);
}

function get(url) {
  return fetch(baseUrl + url).then(onSuccess, onError);
}

function del(url) {
  const request = new Request(baseUrl + url, {
    method: 'DELETE'
  });

  return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error);
}
