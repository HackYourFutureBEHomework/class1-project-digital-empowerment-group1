const API_URL = 'http://localhost:4000';

const headers = {
  'Content-Type': 'application/json'
};

export const getModules = () => {
  return fetch(`${API_URL}/module`).then(response => response.json());
};

export const createModule = (title) => {
  return fetch(`${API_URL}/module`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      title: title
    })
  }).then(response => response.json());
};
