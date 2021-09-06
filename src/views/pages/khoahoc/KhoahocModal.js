import React from 'react'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react'
export const ModalDeleteRow = (props) => {
    return (
        <CModal
            show={props.deleteRow}
            onClose={() => props.setDeleteRow(!props.deleteRow)}
            color="danger"
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
                <CButton color="danger" onClick={() => props.setDeleteRow(!props.deleteRow)}>
                    Do Something
                </CButton>{' '}
                <CButton color="danger" onClick={() => props.setDeleteRow(!props.deleteRow)}>
                    Cancel
                </CButton>
            </CModalFooter>
        </CModal>
    )
}
export const ModalData_synchronizingRow = (props) => {
    return (
        <CModal
            show={props.syncRow}
            onClose={() => props.setSyncRow(!props.syncRow)}
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
                <CButton color="primary">Do Something</CButton>{' '}
                <CButton
                    color="secondary"
                    onClick={() => props.setSyncRow(!props.syncRow)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}