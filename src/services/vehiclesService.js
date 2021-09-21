import http from "./httpService";

export async function getVehicles(params) {              // danh sách xe
    const apiEndPointGetVehicles = "vehicles";
    return http.get(apiEndPointGetVehicles, { params });
  }