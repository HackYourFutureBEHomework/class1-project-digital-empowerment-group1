const API_URL = "http://localhost:4000";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": window.location.origin
};

export const userLogIn = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email: email, password: password })
  });
  return response.json();
};
