export const getColor = (status) => {
    switch (status) {
        case 3: return 'danger'
        case 2: return 'success'
        case 1: return 'warning'
        case 0: return 'secondary'
        default: return
    }
};