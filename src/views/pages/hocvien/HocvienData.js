export const getSex = (sex) => {
    switch (sex) {
        case 'M': return 'Nam'
        case 'F': return 'Nữ'
        default: return
    }
};
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
export let listFinger = () => {
    const arrFinger = []
    for (let i = 0; i < 10; i++) {
        arrFinger.push({ id: i })
    }
    return arrFinger
}
export let listFingerLeft = () => {
    const arrFingerLeft = []
    for (let i = 0; i < 5; i++) {
        arrFingerLeft.push({ id: i })
    }
    return arrFingerLeft
}
export let listFingerRight = () => {
    const arrFingerRight = []
    for (let i = 5; i < 10; i++) {
        arrFingerRight.push({ id: i })
    }
    return arrFingerRight
}