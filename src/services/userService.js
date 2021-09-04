import http from "./httpService";

export function postLogin(end, object) {
  return http.post(end, object);
}

const apiEndPointCourses = "courses";
export async function getCourses() {
  return http.get(apiEndPointCourses);
}

const apiEndPointBranches = "branches";
export async function getBranches(params) {
  return http.get(apiEndPointBranches, params);
}

export function getHeader() {
  return http.getHeaderToken();
}

export default {
  getBranches,
  getCourses,
  getHeader,
};
