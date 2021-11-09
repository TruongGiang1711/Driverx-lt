import http from "./httpService";

export async function getAttendanceDevices(params) {                                // danh sách máy điểm danh
  const apiEndPointGetAttendanceDevices = "attendance_devices";
  return http.get(apiEndPointGetAttendanceDevices, { params });
}
export async function addAttendanceDevices(params) {                                // thêm máy điểm danh
  const apiEndPointAddAttendanceDevices = "attendance_devices";
  return http.post(apiEndPointAddAttendanceDevices, params, {
    headers: {
      'Content-Type': 'text/json'
    }
  })
}
export async function deleteAttendanceDevices(device_id) {                          // xóa máy điểm danh
  const apiEndPointDeleteAttendanceDevices = `attendance_devices/${device_id}`;
  return http.delete(apiEndPointDeleteAttendanceDevices, { device_id });
}
export async function editAttendanceDevicesID(device_id) {                          // lấy thông tin máy điểm danh
  const apiEndPointEditAttendanceDevicesID = `attendance_devices/${device_id}`;
  return http.get(apiEndPointEditAttendanceDevicesID, { device_id });
}
export async function updateAttendanceDevicesID(device_id, ob) {                    // cập nhật thông tin máy điểm danh
  const apiEndPointUpdateAttendanceDevicesID = `attendance_devices/${device_id}`;
  return http.put(apiEndPointUpdateAttendanceDevicesID, ob, {
    headers: {
      'Content-Type': 'text/json',
      params: device_id
    },
  })
}