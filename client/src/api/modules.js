const API_URL = 'http://localhost:4000';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': window.location.origin
};

export const getModules = async () => {
  const response = await fetch(`${API_URL}/module`);
  return response.json();
};

export const createModule = async (title,  explanation, exercise, evaluation) => {
  const response = await fetch(`${API_URL}/module`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      title: title,
      explanation: explanation,
      exercise: exercise,
      evaluation: evaluation
    })
  });
  return response.json();
};

export const deleteModule = async (id) => {
  const response = await fetch(`${API_URL}/module/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};

export const updateModule = async (id, title, explanation, exercise, evaluation) => {
  const response = await fetch(`${API_URL}/module/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      title: title,
      explanation: explanation,
      exercise: exercise,
      evaluation: evaluation
    })
  });
  return response.json();
};

export const completedModule = async (id, completed) => {
  const response = await fetch(`${API_URL}/module/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      completed: completed
    })
  });
  return response.json();
};
