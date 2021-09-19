import http from "./httpService";

export async function getTrainees(params) {             // danh sách học viên theo filter
    const apiEndPointTrainees = "trainees";
    return http.get(apiEndPointTrainees, { params });
  }