import http from "./httpService";

export function postLogin(end, object) {
  return http.post(end, object)
}

export function getCourses(end) {
  return http.get(end)
}