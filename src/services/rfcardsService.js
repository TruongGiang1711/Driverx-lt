import http from "./httpService";

export async function getRfcards(params) {              // danh sách thẻ
    const apiEndPointGetRfcards = "rfcards";
    return http.get(apiEndPointGetRfcards, { params });
  }