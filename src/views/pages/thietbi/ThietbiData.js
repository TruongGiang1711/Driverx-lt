export const getColor_Card_status = (status) => {
    switch (status) {
        case 1: return 'success'
        case 0: return 'secondary'
        case true: return 'success'
        case false: return 'secondary'
        default: return
    }
};
export const getCard_status = (status) => {
    switch (status) {
        case 1: return 'Đã sử dụng'
        case 0: return 'Chưa sử dụng'
        case true: return 'Đã sử dụng'
        case false: return 'Chưa sử dụng'
        default: return
    }
};
export let listStatus = () => {
    const arrStatus = []
    for (let i = 0; i < 2; i++) {
        arrStatus.push({ id: i, name: getCard_status(i) })
    }
    return arrStatus
}