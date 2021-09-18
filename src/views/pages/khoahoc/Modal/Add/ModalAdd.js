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
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CDataTable,
    CListGroup,
    CListGroupItem,
    CFade,
    CLink,
    CInputCheckbox,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const ModalAdd = (props) => {
    const onChangeFile = (value) => {
        if (value.target.files.length > 0) {
            props.add.props.add.setAddRow({ ...props.add.props.add.addRow, file: value.target.files, nameFile: value.target.files[0].name, disable: false })
        } else {
            props.add.props.add.setAddRow({ ...props.add.props.add.addRow, nameFile: undefined, disable: true })
        }
    }
    const closeModal = () => {
        props.add.props.add.setAddRow({ ...props.add.props.add.addRow, nameFile: undefined, on_off: !props.add.props.add.addRow.on_off, disable: true })
    }
    useEffect(() => {
        document.getElementById("custom-file-input").value = "";
    }, [props.add.props.add.addRow.on_off])
    return (
        <CModal
            show={props.add.props.add.addRow.on_off}
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
                        <CInputFile custom id="custom-file-input" onChange={(value) => onChangeFile(value)} disabled={props.add.props.add.addRow.loading ? true : false} />
                        <CLabel htmlFor="custom-file-input" variant="custom-file">
                            {props.add.props.add.addRow.nameFile ? props.add.props.add.addRow.nameFile : "Chọn file XML"}
                        </CLabel>
                    </CCol>
                </CFormGroup>
            </CModalBody>
            <CModalFooter>
                <CButton color="info" onClick={() => props.add.props.add.onAddFileXML()} disabled={props.add.props.add.addRow.disable}>
                    {props.add.props.add.addRow.loading ? <CSpinner className="mr-2" component="span" size="sm" aria-hidden="true" style={{ marginBottom: "0.1rem" }} /> : ""}
                    Đồng ý
                </CButton>{' '}
                <CButton color="info" onClick={closeModal}>
                    Hủy
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalAdd;