import React from 'react'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CSpinner,
    CImg,
    CSelect,
    CCol,
    CRow,
    CFormGroup,
    CLabel,
    CInput,
} from '@coreui/react'
import img from './../../../../../assets/mA5gDcEg.png'

const ModalEdit = (props) => {
    const closeModal = () => {
        props.edit.setEditRow({ ...props.edit.editRow, on_off: false })
    }
    return (
        <CModal
            show={props.edit.editRow.on_off}
            onClose={closeModal}
            color="warning"
            closeOnBackdrop={false}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>Thay đổi thông tin học viên</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol xs="12" md="3">
                        <CImg
                            src={img}
                            fluid
                            className="mb-2 img-fluid"
                        />
                    </CCol>
                    <CCol>
                        <CRow>
                            <CCol>
                                <CFormGroup>
                                    <CLabel>Họ và tên</CLabel>
                                    <CInput
                                        placeholder="Họ và tên"
                                    />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel>Ngày sinh</CLabel>
                                    <CInput type="date"
                                        placeholder="Ngày sinh"
                                    />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel>Giới tính</CLabel>
                                    <CSelect custom>
                                        <option value="M">Nam</option>
                                        <option value="F">Nữ</option>
                                        <option value="OR">Khác</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel>CMND</CLabel>
                                    <CInput
                                        placeholder="CMND"
                                    />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel>RFID</CLabel>
                                    <CInput
                                        placeholder="RFID"
                                    />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel>Số thẻ</CLabel>
                                    <CInput
                                        placeholder="Số thẻ"
                                    />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton color="warning" onClick={() => props.delete.setDeleteRow(!props.delete.deleteRow)}>
                    {props.edit.editRow.loading ? <CSpinner className="mr-2" component="span" size="sm" aria-hidden="true" style={{ marginBottom: "0.1rem" }} /> : ""}
                    Cập nhật
                </CButton>
                <CButton color="secondary" onClick={closeModal}>
                    Hủy
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalEdit