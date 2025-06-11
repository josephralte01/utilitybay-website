import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_BASE + '/api';

export async function login(email, password) {
  const res = await axios.post(`${API}/auth/login`, { email, password });
  return res.data;
}

export async function register(email, password, name) {
  const res = await axios.post(`${API}/auth/register`, { email, password, name });
  return res.data;
}

export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem('token');
}
