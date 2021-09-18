import {
    CToaster,
    CToast,
    CToastHeader,
    CToastBody,
} from "@coreui/react";
import { getColor, getStatus } from "src/views/component/getBadge/GetBadge";

export const ToastStatus = (props) => {
    // console.log(props);
    return Object.keys(props).map((toasterKey) => (
        <CToaster
            position={toasterKey}
            key={'toaster'}
            className={'toast-custom'}
        >
            {
                props[toasterKey].map((toast, key) => {
                    return (
                        <CToast
                            className={getColor(toast.statusColor)}
                            key={'toast' + key}
                            show={toast.show}
                            autohide={toast.autohide}
                            fade={toast.fade}
                        >
                            <CToastHeader closeButton={toast.closeButton}>
                                Toast title
                            </CToastHeader>
                            <CToastBody>
                                {toast.error ? `Khóa học đã được bắt đầu hoặc thẻ được chỉ định cho khóa học.` : `Đã cập nhật trạng thái ${getStatus(toast.value)} cho khóa ${toast.item && toast.item.ten_khoa_hoc}.`}
                            </CToastBody>
                        </CToast>
                    )
                })
            }
        </CToaster>
    ))
}