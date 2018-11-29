const API_URL = 'http://localhost:4000/path';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': window.location.origin
};

export const getPaths = () => {
  return fetch(`${API_URL}`).then(response => response.json());
};

export const getPath = pathId => {
  return fetch(`${API_URL}/${pathId}`).then(response => response.json());
};

export const createPath = title => {
  return fetch(`${API_URL}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({title:title})
  }).then(response => response.json());
};

export const deletePath = pathId => {
  return fetch(`${API_URL}/${pathId}`, {
    method: 'DELETE'
  }).then(response => response.json());
};

export const updatePath = (pathId, path) => {
  return fetch(`${API_URL}/${pathId}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(path)
  }).then(response => response.json());
};
