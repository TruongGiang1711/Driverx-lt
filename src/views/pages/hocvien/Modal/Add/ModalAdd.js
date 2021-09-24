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

const ModalAdd = (props) => {
    const closeModal = () => {
        props.add.setAddRow({ ...props.add.addRow, on_off: false, })
    }
    return (
        <CModal
            show={props.add.addRow.on_off}
            onClose={closeModal}
            color="primary"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Modal title</CModalTitle>
            </CModalHeader>
            <CModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={() => props.add.setAddRow(!props.add.addRow)}>
                    {props.add.addRow.loading ? <CSpinner className="mr-2" component="span" size="sm" aria-hidden="true" style={{ marginBottom: "0.1rem" }} /> : ""}
                    Do Something
                </CButton>{' '}
                <CButton color="primary" onClick={closeModal}>
                    Cancel
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalAdd