import http from "./httpService";

export async function getDevices(params) {              // danh sách thiết bị theo phân hiệu
    const apiEndPointDevices = "attendance_devices";
    return http.get(apiEndPointDevices, { params });
  }