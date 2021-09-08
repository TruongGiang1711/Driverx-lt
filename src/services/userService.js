import { setJwt, getJwt } from "./authService";
import http from "./httpService";

const apiEndpointLogin = "/login";
export async function postLogin(email, password) {
  const { data } = await http.post(apiEndpointLogin, { email, password });
  return setJwt(data)
}

http.setAuthorizationBearer(getJwt());
export async function getMe() {                         // thông tin admin
  const apiEndPointMe = "/me";
  return http.get(apiEndPointMe);
}
export async function getBranches(params) {             // danh sách phân hiệu theo quyền
  const apiEndPointBranches = "/branches";
  return http.get(apiEndPointBranches, { params });
}
export async function getCourses(params) {              // danh sách khóa theo filter
  const apiEndPointCourses = "/courses";
  return http.get(apiEndPointCourses, { params });
}
export async function getCoursesID(course_id) {         // danh sách khóa theo filter
  const apiEndPointCoursesID = `/courses/${course_id}`;
  return http.get(apiEndPointCoursesID, { course_id });
}
export async function getTrainees(params) {             // danh sách học viên theo filter
  const apiEndPointTrainees = "/trainees/";
  return http.get(apiEndPointTrainees, { params });
}
export async function getHangs() {                      // danh sách hạng
  const apiEndPointHang = "/data/hang";
  return http.get(apiEndPointHang);
}




export function getHeader() {
  return http.getHeaderToken();
}
