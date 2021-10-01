import http from "./httpService";

export async function getRfcards(params) {              // danh sách thẻ
  const apiEndPointGetRfcards = "rfcards";
  return http.get(apiEndPointGetRfcards, { params });
}
export async function addRfcards(params) {               // thêm thẻ
  const apiEndPointRfcards = "/rfcards";
  return http.post(apiEndPointRfcards, params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}