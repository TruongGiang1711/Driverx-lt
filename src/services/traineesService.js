import http from "./httpService";

export async function getTrainees(params) {                                                                   // danh sách học viên theo filter
  const apiEndPointGetTrainees = "trainees";
  return http.get(apiEndPointGetTrainees, { params });
}
export async function deleteFingerprintsTrainees(trainee_id, index) {                                         // xóa vân tay học viên
  const apiEndPointDeleteFingerprintsTrainees = `trainees/${trainee_id}/fingerprints/${index}`;
  return http.delete(apiEndPointDeleteFingerprintsTrainees);
}
export async function updateRfcardsTrainee(trainee_id) {                                                          // cập nhật thẻ học viên
  const apiEndPointUpdateRfcardsTrainee = `trainees/${trainee_id}/rfcards`;
  return http.post(apiEndPointUpdateRfcardsTrainee, { trainee_id });
}
export async function getFingerprint(trainee_id) {                                                                // lấy vân tay học viên
  const apiEndPointGetFingerprint = `/trainees/${trainee_id}/fingerprints`;
  return http.get(apiEndPointGetFingerprint);
}