import http from "./httpService";

export async function getHangs() {                      // danh sách hạng
    const apiEndPointGetHang = "data/hang";
    return http.get(apiEndPointGetHang);
  }