import http from "./httpService";

export async function getCourses(params) {                                              // danh sách khóa theo filter
  const apiEndPointGetCourses = "/courses";
  return http.get(apiEndPointGetCourses, { params });
}
export async function addCourse(params) {                                               // thêm khóa học
  const apiEndPointAddCourses = "/courses";
  return http.post(apiEndPointAddCourses, params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export async function getCoursesID(course_id) {                                         // thông tin khóa học
  const apiEndPointGetCoursesID = `courses/${course_id}`;
  return http.get(apiEndPointGetCoursesID, { course_id });
}
export async function updateCourse(course_id, status) {                                 // cập nhật trạng thái khóa học
  const apiEndPointUpdateCourses = `courses/${course_id}`;
  return http.put(apiEndPointUpdateCourses, { status });
}
export async function deleteCourse(course_id) {                                         // xóa khóa học
  const apiEndPointDeleteCourses = `courses/${course_id}`;
  return http.delete(apiEndPointDeleteCourses, { course_id });
}
export async function getDevicesCourse(course_id) {                                     // danh sách thiết bị đã assign theo khóa
  const apiEndPointDevicesCourse = `courses/${course_id}/devices`;
  return http.get(apiEndPointDevicesCourse, { course_id });
}
export async function addDevicesCourse(course_id, params) {                             // thêm thiết bị cho khóa
  const apiEndPointAddDevicesCourse = `courses/${course_id}/devices`;
  return http.post(apiEndPointAddDevicesCourse, { ...params });
}
export async function deleteDevicesCourse(course_id, device_id) {                       // xóa thiết bị của khóa
  const apiEndPointDeleteDevicesCourse = `courses/${course_id}/devices/${device_id}`;
  return http.delete(apiEndPointDeleteDevicesCourse);
}
export async function getVehiclesCourse(course_id) {                                     // danh sách xe đã assign theo khóa
  const apiEndPointVehiclesCourse = `courses/${course_id}/vehicles`;
  return http.get(apiEndPointVehiclesCourse, { course_id });
}
export async function addVehiclesCourse(course_id, params) {                             // thêm xe cho khóa
  const apiEndPointAddVehiclesCourse = `courses/${course_id}/vehicles`;
  return http.post(apiEndPointAddVehiclesCourse, { ...params });
}
export async function deleteVehiclesCourse(course_id, vehicles_id) {                     // xóa xe của khóa
  const apiEndPointDeleteVehiclesCourse = `courses/${course_id}/vehicles/${vehicles_id}`;
  return http.delete(apiEndPointDeleteVehiclesCourse);
}