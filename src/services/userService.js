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
export async function addCourse(params) {              // thêm khóa học
  const apiEndPointCourses = "/courses";
  return http.post(apiEndPointCourses, params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export async function getCoursesID(course_id) {         // thông tin khóa học
  const apiEndPointCoursesID = `courses/${course_id}`;
  return http.get(apiEndPointCoursesID, { course_id });
}
export async function updateCourse(course_id, status) { // cập nhật trạng thái khóa học
  const apiEndPointCourses = `courses/${course_id}`;
  return http.put(apiEndPointCourses, { status });
}
export async function deleteCourse(course_id) {         // xóa khóa học
  const apiEndPointCourses = `courses/${course_id}`;
  return http.delete(apiEndPointCourses, { course_id });
}
export async function getTrainees(params) {             // danh sách học viên theo filter
  const apiEndPointTrainees = "trainees";
  return http.get(apiEndPointTrainees, { params });
}
export async function getHangs() {                      // danh sách hạng
  const apiEndPointHang = "data/hang";
  return http.get(apiEndPointHang);
}
export async function getDevices(params) {              // danh sách thiết bị theo phân hiệu
  const apiEndPointDevices = "attendance_devices";
  return http.get(apiEndPointDevices, { params });
}
export async function getDevicesCourse(course_id) {     // danh sách thiết bị đã assign theo khóa
  const apiEndPointDevicesCourse = `courses/${course_id}/devices`;
  return http.get(apiEndPointDevicesCourse, { course_id });
}




export function getHeader() {
  return http.getHeaderToken();
}
