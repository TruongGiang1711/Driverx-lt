import http from "./httpService";

export async function getTrainees(params) {               // danh sách học viên theo filter
    const apiEndPointGetTrainees = "trainees";
    return http.get(apiEndPointGetTrainees, { params });
  }