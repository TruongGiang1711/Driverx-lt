import {
    CToaster,
    CToast,
    CToastHeader,
    CToastBody,
} from "@coreui/react";
import { getColor } from "src/views/component/getBadge/GetBadge";

const MaydiemdanhToast = (props) => {
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
                                Thông báo
                            </CToastHeader>
                            <CToastBody>
                                {toast.error}
                            </CToastBody>
                        </CToast>
                    )
                })
            }
        </CToaster>
    ))
}

export default MaydiemdanhToast;