import http from "./httpService";

export function getCourses(end){
  return http.get(end)
}