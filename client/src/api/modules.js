const API_URL = 'http://localhost:4000';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': window.location.origin
};

export const getModules = () => {
  return fetch(`${API_URL}/module`).then(response => response.json());
};

export const createModule = (title,  explanation, exercise, evaluation) => {
  return fetch(`${API_URL}/module`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      title: title,
      explanation : explanation,
      exercise: exercise,
      evaluation: evaluation
    })
  }).then(response => response.json());
};

export const deleteModule = (id) => {
  return fetch(`${API_URL}/module/${id}`, {
    method: 'DELETE'
  }).then(response => response.json());
};

export const updateModule = (id, title, explanation, exercise, evaluation) => {
  return fetch(`${API_URL}/module/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      title: title,
      explanation : explanation,
      exercise: exercise,
      evaluation: evaluation
    })
  }).then(response => response.json());
};

export const completedModule = (id, completed) => {
  return fetch(`${API_URL}/module/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      completed: completed
    })
  }).then(response => response.json());
};
