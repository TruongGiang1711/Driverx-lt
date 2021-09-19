import http from "./httpService";

export async function getHangs() {                      // danh sách hạng
    const apiEndPointHang = "data/hang";
    return http.get(apiEndPointHang);
  }