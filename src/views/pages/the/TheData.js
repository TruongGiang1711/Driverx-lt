export const getColor_StatusCards = (status) => {
    switch (status) {
        case 1: return 'success'
        case 0: return 'secondary'
        case -1: return 'danger'
        default: return
    }
};
export const getStatusCards = (status) => {
    switch (status) {
        case 1: return 'Đã sử dụng'
        case 0: return 'Chưa sử dụng'
        case -1: return 'Thẻ mất'
        default: return
    }
};
export let listCard = () => {
    const arrCard = []
    for (let i = -1; i < 2; i++) {
        arrCard.push({ id: i, name: getStatusCards(i) })
    }
    return arrCard
}