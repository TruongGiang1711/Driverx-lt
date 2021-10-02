import http from "./httpService";

export async function getTrainees(params) {                                                                   // danh sách học viên theo filter
  const apiEndPointGetTrainees = "trainees";
  return http.get(apiEndPointGetTrainees, { params });
}
export async function deleteFingerprintsTrainees(trainee_id, index) {                                         // xóa vân tay học viên
  const apiEndPointDeleteFingerprintsTrainees = `trainees/${trainee_id}/fingerprints/${index}`;
  return http.delete(apiEndPointDeleteFingerprintsTrainees);
}
export async function updateRfcardsTrainee(params) {                                                          // cập nhật thẻ học viên
  const apiEndPointUpdateRfcardsTrainee = `trainees/change_trainee_card_trainees__trainee_id__rfcards_post`;
  return http.put(apiEndPointUpdateRfcardsTrainee, { params });
}
export async function getFingerprint(params) {                                                                // lấy vân tay
  const apiEndPointGetFingerprint = "/devices/attendance/commands";
  return http.post(apiEndPointGetFingerprint, { params });
}