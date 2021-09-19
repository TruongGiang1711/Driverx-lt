import http from "./httpService";

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
  export async function getDevicesCourse(course_id) {     // danh sách thiết bị đã assign theo khóa
    const apiEndPointDevicesCourse = `courses/${course_id}/devices`;
    return http.get(apiEndPointDevicesCourse, { course_id });
  }