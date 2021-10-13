export const usersDataFake = [
    { stt: 0, biometrics: { fingerprint: 20, fade_id: 30 }, data_synchronizing: 0, theory: { number: 7, start_theory: 20, end_theory: 40, sum: 90 }, practise: { start_practise: 500, end_practise: 1000, sum: 1200 } },
    { stt: 1, biometrics: { fingerprint: 10, fade_id: 20 }, data_synchronizing: 1, theory: { number: 5, start_theory: 15, end_theory: 57, sum: 90 }, practise: { start_practise: 400, end_practise: 700, sum: 1200 } },
    { stt: 2, biometrics: { fingerprint: 20, fade_id: 10 }, data_synchronizing: 2, theory: { number: 8, start_theory: 26, end_theory: 38, sum: 90 }, practise: { start_practise: 300, end_practise: 900, sum: 1200 } },
    { stt: 3, biometrics: { fingerprint: 30, fade_id: 20 }, data_synchronizing: 1, theory: { number: 10, start_theory: 11, end_theory: 41, sum: 90 }, practise: { start_practise: 1000, end_practise: 2000, sum: 1200 } },
]
export function getDataFake(id) {
    const index = id % usersDataFake.length
    return usersDataFake[index]
}
export const getStatus = (status) => {
    switch (status) {
        case 3: return 'Kết thúc'
        case 2: return 'Thực hành'
        case 1: return 'Lý thuyết'
        case 0: return 'Chưa diễn ra'
        default: return
    }
};
export let listStatus = () => {
    const arrStatus = []
    for (let i = 0; i < 4; i++) {
        arrStatus.push({ id: i, name: getStatus(i) })
    }
    return arrStatus
}