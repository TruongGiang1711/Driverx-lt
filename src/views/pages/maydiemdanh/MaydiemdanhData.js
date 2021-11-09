export const getColor_StatusCards = (status) => {
    switch (status) {
        case 1: return 'success'
        case 0: return 'secondary'
        case true: return 'success'
        case false: return 'secondary'
        default: return
    }
};
export const getStatus = (status) => {
    switch (status) {
        case 1: return 'Online'
        case 0: return 'Offline'
        case true: return 'Online'
        case false: return 'Offline'
        default: return
    }
};
export let listCard = () => {
    const arrCard = []
    for (let i = 0; i < 2; i++) {
        arrCard.push({ id: i, name: getStatus(i) })
    }
    return arrCard
}