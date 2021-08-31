import http from "./httpService";
import authService from "./authService";
import jwtDecode from "jwt-decode";

const apiEndPoint = "courses";
// authService.getJwt();
export async function getCourses() {
  return http.get(apiEndPoint);
}

export function getHeader() {
  return http.getHeaderToken();
}

export default {
  getCourses,
  getHeader,
};
