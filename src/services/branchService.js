import http from "./httpService";

export async function getBranches(params) {             // danh sách phân hiệu theo quyền
    const apiEndPointBranches = "/branches";
    return http.get(apiEndPointBranches, { params });
  }