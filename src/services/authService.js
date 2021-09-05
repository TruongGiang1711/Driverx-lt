import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/login";
const tokenKey = "token";

// http.setJwt(getJwt());
export async function login(email, password) {
  const { data } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, data.access_token);
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getJwt() {
  return localStorage.getItem(tokenKey) || null;
}
export function getSessionJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
