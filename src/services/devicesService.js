import http from "./httpService";

export async function getDevices(params) {              // danh sách thiết bị theo phân hiệu
    const apiEndPointGetDevices = "attendance_devices";
    return http.get(apiEndPointGetDevices, { params });
  }