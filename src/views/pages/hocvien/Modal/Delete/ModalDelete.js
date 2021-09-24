import React from 'react'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CSpinner,
} from '@coreui/react'

const ModalDelete = (props) => {
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
                <CModalTitle>Xóa học viên</CModalTitle>
            </CModalHeader>
            <CModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
            </CModalBody>
            <CModalFooter>
                <CButton color="danger" onClick={() => props.delete.setDeleteRow(!props.delete.deleteRow)}>
                    {props.delete.deleteRow.loading ? <CSpinner className="mr-2" component="span" size="sm" aria-hidden="true" style={{ marginBottom: "0.1rem" }} /> : ""}
                    Do Something
                </CButton>{' '}
                <CButton color="danger" onClick={closeModal}>
                    Cancel
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalDelete