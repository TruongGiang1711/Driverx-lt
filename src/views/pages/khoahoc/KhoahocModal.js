import React, { forwardRef, useEffect, useRef, useState } from 'react'
import {
    CButton,
    CCol,
    CFormGroup,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CInput,
    CLabel,
    CSpinner,
    CInputFile,
} from '@coreui/react'

export const ModalAddRow = (props) => {
    const onChangeFile = (value) => {
        if (value.target.files.length > 0) {
            props.setAddRow({ ...props.addRow, file: value.target.files, nameFile: value.target.files[0].name, disable: false })
        } else {
            props.setAddRow({ ...props.addRow, nameFile: undefined, disable: true })
        }
    }
    const closeModal = () => {
        props.setAddRow({ ...props.addRow, nameFile: undefined, on_off: !props.addRow.on_off, disable: true })
    }
    useEffect(() => {
        document.getElementById("custom-file-input").value = "";
    }, [props.addRow.on_off])
    return (
        <CModal
            show={props.addRow.on_off}
            onClose={closeModal}
            color="info"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Thêm khóa</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CFormGroup>
                    <CCol>
                        <CInputFile custom id="custom-file-input" onChange={(value) => onChangeFile(value)} disabled={props.addRow.loading ? true : false} />
                        <CLabel htmlFor="custom-file-input" variant="custom-file">
                            {props.addRow.nameFile ? props.addRow.nameFile : "Chọn file XML"}
                        </CLabel>
                    </CCol>
                </CFormGroup>
            </CModalBody>
            <CModalFooter>
                <CButton color="info" onClick={() => props.onAddFileXML()} disabled={props.addRow.disable}>
                    {props.addRow.loading ? <CSpinner component="span" size="sm" aria-hidden="true" /> : ""}
                    Đồng ý
                </CButton>{' '}
                <CButton color="info" onClick={closeModal}>
                    Hủy
                </CButton>
            </CModalFooter>
        </CModal>
    )
}
export const ModalDeleteRow = (props) => {
    // console.log(props);
    return (
        <CModal
            show={props.deleteRow.on_off}
            onClose={() => props.setDeleteRow(!props.deleteRow.on_off)}
            color="danger"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Xóa khóa</CModalTitle>
            </CModalHeader>
            <CModalBody>Bạn có muốn xóa khóa học {props.deleteRow.item && props.deleteRow.item.ten_khoa_hoc}</CModalBody>
            <CModalFooter>
                <CButton color="danger" onClick={() => props.onDeleteRow(props.deleteRow.item && props.deleteRow.item.id)}>
                    Đồng ý
                </CButton>{' '}
                <CButton color="danger" onClick={() => props.setDeleteRow(!props.deleteRow.on_off)}>
                    Hủy
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
                <CButton color="primary" onClick={() => props.setSyncRow(!props.syncRow)}>
                    Do Something
                </CButton>{' '}
                <CButton color="secondary" onClick={() => props.setSyncRow(!props.syncRow)}>
                    Cancel
                </CButton>
            </CModalFooter>
        </CModal>
    )
}