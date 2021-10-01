import http from "./httpService";

export async function getTrainees(params) {                                                       // danh sách học viên theo filter
  const apiEndPointGetTrainees = "trainees";
  return http.get(apiEndPointGetTrainees, { params });
}
export async function deleteFingerprintsTrainees(trainee_id, index) {                             // xóa vân tay học viên
  const apiEndPointDeleteFingerprintsTrainees = `trainees/${trainee_id}/fingerprints/${index}`;
  return http.delete(apiEndPointDeleteFingerprintsTrainees);
}