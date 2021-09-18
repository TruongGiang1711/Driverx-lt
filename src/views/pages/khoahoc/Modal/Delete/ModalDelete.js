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

const ModalDelete = (props) => {
    // console.log(props);
    const closeModal = () => {
        props.delete.props.delete.setDeleteRow(!props.delete.props.delete.deleteRow.on_off)
    }
    return (
        <CModal
            show={props.delete.props.delete.deleteRow.on_off}
            onClose={closeModal}
            color="danger"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Xóa khóa</CModalTitle>
            </CModalHeader>
            <CModalBody>Bạn có muốn xóa khóa học {props.delete.props.delete.deleteRow.item && props.delete.props.delete.deleteRow.item.ten_khoa_hoc}</CModalBody>
            <CModalFooter>
                <CButton color="danger" onClick={() => props.delete.props.delete.onDeleteRow(props.delete.props.delete.deleteRow.item && props.delete.props.delete.deleteRow.item.id)}>
                    Đồng ý
                </CButton>{' '}
                <CButton color="danger" onClick={closeModal}>
                    Hủy
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalDelete