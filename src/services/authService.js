import http from "./httpService";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export const getJwt = () => {
  return localStorage.getItem(tokenKey) || null;
}
export const removeJwt = () => {
  localStorage.removeItem(tokenKey);
}
export const setJwt = (data) => {
  localStorage.setItem(tokenKey, data.access_token);
  http.setAuthorizationBearer(getJwt());
}




export const getSessionJwt = () => {
  return localStorage.getItem(tokenKey);
}
export const loginWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
}
export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

// export default {
//   getJwt,
//   removeJwt,
//   setJwt,
//   getCurrentUser,
//   loginWithJwt,
// };
