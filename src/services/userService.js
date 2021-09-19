import { setJwt, getJwt } from "./authService";
import http from "./httpService";

export async function postLogin(email, password) {
  const apiEndpointLogin = "/login";
  const { data } = await http.post(apiEndpointLogin, { email, password });
  return setJwt(data)
}

http.setAuthorizationBearer(getJwt());
export async function getMe() {                         // thông tin admin
  const apiEndPointMe = "/me";
  return http.get(apiEndPointMe);
}




export function getHeader() {
  return http.getHeaderToken();
}
