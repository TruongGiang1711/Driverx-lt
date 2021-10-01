import React, { useEffect } from 'react'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CSpinner,
    CModalTitle,
    CModalHeader,
    CToaster,
    CToast,
    CToastHeader,
    CToastBody,
} from '@coreui/react'

const ModalDelete = (props) => {
    console.log(props);
    const closeModal = () => {
        props.delete.setDeleteRow({ ...props.delete.deleteRow, on_off: false })
    }
    return (
        <CModal
            show={props.delete.deleteRow.on_off}
            onClose={closeModal}
            color="danger"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Xóa thẻ</CModalTitle>
            </CModalHeader>
            <CModalBody>Bạn có muốn xóa thẻ {props.delete.deleteRow.item && props.delete.deleteRow.item.card_name}</CModalBody>
            <CModalFooter>
                <CButton color="danger" onClick={() => props.delete.setDeleteRow(!props.delete.deleteRow)}>
                    {props.delete.deleteRow.loading ? <CSpinner className="mr-2" component="span" size="sm" aria-hidden="true" style={{ marginBottom: "0.1rem" }} /> : ""}
                    Đồng ý
                </CButton>
                <CButton color="secondary" onClick={closeModal}>
                    Hủy
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalDelete