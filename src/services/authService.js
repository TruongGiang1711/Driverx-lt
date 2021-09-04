import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/login";
const tokenKey = "token";
const tokenFake =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIzLCJleHAiOjE2MzA4NTg3NTN9.gaw76CjjokcktsqKKyLwnNk4uTgzhH5iKQGNLbX3vOQ";

http.setJwt(getJwt());
export async function login(email, password) {
  const { data } = await http.post(apiEndpoint, { email, password });
  console.log(data.access_token);
  localStorage.setItem(tokenKey, data.access_token);
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getJwt() {
  // return localStorage.getItem(tokenKey);
  return localStorage.getItem(tokenKey);
}
export function getSessionJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    console.log(jwt);
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
