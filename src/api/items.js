import 'whatwg-fetch';
import getBaseUrl from './base-url';

const baseUrl = getBaseUrl();

export function getItems() {
  return get('items');
}

export function deleteItem(id) {
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
