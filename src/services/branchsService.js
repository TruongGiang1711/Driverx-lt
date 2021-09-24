import http from "./httpService";

export async function getBranches(params) {                 // danh sách phân hiệu theo quyền
    const apiEndPointGetBranches = "/branches";
    return http.get(apiEndPointGetBranches, { params });
  }