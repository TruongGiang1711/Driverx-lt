import { setJwt, getJwt } from "./authService";
import http from "./httpService";

const apiEndpointLogin = "/login";
export async function postLogin(email, password) {
  const { data } = await http.post(apiEndpointLogin, { email, password });
  return setJwt(data)
}

http.setAuthorizationBearer(getJwt());
const apiEndPointBranches = "/branches";
export async function getBranches(params) {
  return http.get(apiEndPointBranches, { params });
}
const apiEndPointCourses = "/courses";
export async function getCourses(params) {
  return http.get(apiEndPointCourses, { params });
}
const apiEndPointHang = "/data/hang";
export async function getHangs() {
  return http.get(apiEndPointHang);
}




export function getHeader() {
  return http.getHeaderToken();
}
