import authService from "./authService";
import http from "./httpService";

export function postLogin(end, object) {
  return http.post(end, object);
}

const apiEndPointBranches = "branches";
export async function getBranches(params) {
  return http.get(apiEndPointBranches, { params });
}

const apiEndPointCourses = "courses";
export async function getCourses(params) {
  http.setJwt(authService.getJwt());
  return http.get(apiEndPointCourses, { params });
}

const apiEndPointHang = "/data/hang";
export async function getHangs() {
  return http.get(apiEndPointHang);
}

export function getHeader() {
  return http.getHeaderToken();
}

export default {
  getBranches,
  getCourses,
  getHeader,
};
