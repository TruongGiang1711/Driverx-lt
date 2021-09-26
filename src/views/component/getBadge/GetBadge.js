export const getColor = (status) => {
    switch (status) {
        case 3: return 'error'
        case 2: return 'success'
        case 1: return 'warning'
        case 0: return 'secondary'
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
export const getColorCard_status = (status) => {
    switch (status) {
        case 1: return 'info'
        case 0: return 'secondary'
        default: return
    }
};
export const getCard_status = (status) => {
    switch (status) {
        case 1: return 'Đã gán thẻ'
        case 0: return 'Chưa gán thẻ'
        default: return
    }
};
export const getData_synchronizing_status = (status) => {
    switch (status) {
        case 2: return 'secondary'
        case 1: return 'success'
        case 0: return 'danger'
        default: return
    }
};
export const getStatusCards = (status) => {
    switch (status) {
        case -2: return 'Tất cả'
        case 1: return 'Đã sử dụng'
        case 0: return 'Chưa sử dụng'
        case -1: return 'Thẻ mất'
        default: return
    }
};