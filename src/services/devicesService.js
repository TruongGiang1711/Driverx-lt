import http from "./httpService";

export async function getDevices(params) {                          // danh sách thiết bị theo phân hiệu
  const apiEndPointGetDevices = "attendance_devices";
  return http.get(apiEndPointGetDevices, { params });
}
export async function addFingerprint(params) {                      // lấy vân tay từ thiết bị
  const apiEndPointAddFingerprint = "/devices/attendance/commands";
  return http.post(apiEndPointAddFingerprint, { params });
}

export async function getTrackingDevices(params) {                  // danh sách thiết bị
  const apiEndPointGetTrackingDevices = "tracking_devices";
  return http.get(apiEndPointGetTrackingDevices, { params });
}
export async function addTrackingDevices(params) {                  // thêm thiết bị
  const apiEndPointAddTrackingDevices = "tracking_devices";
  return http.post(apiEndPointAddTrackingDevices, params, {
    headers: {
      'Content-Type': 'text/json'
    }
  })
}
export async function deleteTrackingDevices(device_id) {                  // xóa thiết bị
  const apiEndPointDeleteTrackingDevices = `tracking_devices/${device_id}`;
  return http.delete(apiEndPointDeleteTrackingDevices, { device_id });
}