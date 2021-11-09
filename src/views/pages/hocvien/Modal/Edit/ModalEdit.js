import React, { useEffect, useState } from 'react'
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
import { getTrainees, updateRfcardsTrainee } from 'src/services/traineesService'

const ModalEdit = (props) => {
    // console.log(props);
    const closeModal = () => {
        props.edit.setEditRow({ ...props.edit.editRow, on_off: false })
    }
    const updateInfo = () => {
        props.edit.setEditRow({ ...props.edit.editRow, disable: true, loading: true })
        // async function updateInfo() {
        //     try {
        //         const updateCrad = await updateInfoTrainee(props.edit.editRow.item.id);
        //         if (updateCrad.statusText === 'OK') {
        //             async function fetchTrainees() {
        //                 const ob = {
        //                     ...props.edit.filter,
        //                 }
        //                 try {
        //                     const trainees = await getTrainees(ob);
        //                     props.edit.setTrainees(trainees.data.items);
        //                     props.edit.setTotalpages(trainees.data.total)
        //                 } catch (error) {
        //                 }
        //             }
        //             fetchTrainees()
        //             props.edit.callToast(`Cập nhật thành công thông tin học viên ${props.edit.editRow.item.ho_va_ten}!`, 2)
        //             props.edit.setEditRow({ ...props.edit.editRow, on_off: false, loading: false })
        //         }
        //     } catch (error) {
        //         props.edit.callToast(`Cập nhật không thành công thông tin học viên ${props.edit.editRow.item.ho_va_ten}!`, 3)
        //         props.edit.setEditRow({ ...props.edit.editRow, disable: false, loading: false })
        //     }
        // }
        // updateInfo()
    }
    // handle click event of the Add RfCard
    const updateRfCard = () => {
        props.edit.setInputList([...props.edit.inputList, { rfid_card: "", rfid_card_name: "" }]);
        props.edit.setEditRow({ ...props.edit.editRow, disable: true, loadingRfCard: true })
        async function updateRfcard() {
            try {
                const updateCrad = await updateRfcardsTrainee(props.edit.editRow.item.id);
                if (updateCrad.statusText === 'OK') {
                    async function fetchTrainees() {
                        const ob = {
                            ...props.edit.filter,
                        }
                        try {
                            const trainees = await getTrainees(ob);
                            props.edit.setTrainees(trainees.data.items);
                            props.edit.setTotalpages(trainees.data.total)
                        } catch (error) {
                        }
                    }
                    fetchTrainees()
                    props.edit.setInputList([...props.edit.inputList, { rfid_card: updateCrad.data.rfid_card, rfid_card_name: updateCrad.data.rfid_card_name }]);
                    props.edit.callToast(`Cập nhật thành công số thẻ cho học viên ${props.edit.editRow.item.ho_va_ten}!`, 2)
                    props.edit.setEditRow({ ...props.edit.editRow, disable: false, loadingRfCard: false })
                }
            } catch (error) {
                props.edit.callToast(`Thẻ thực tập sinh không tìm thấy!`, 3)
                props.edit.setEditRow({ ...props.edit.editRow, disable: false, loadingRfCard: false })
            }
        }
        updateRfcard()
    }
    useEffect(() => {
        const oldInputList = [props.edit.inputList]
        props.edit.setInputList(oldInputList)
    }, [props.edit.editRow && props.edit.editRow.item]);
    return (
        <CModal
            show={props.edit.editRow.on_off}
            onClose={closeModal}
            color=""
            closeOnBackdrop={false}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>Cập nhật thông tin học viên</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol xs="12" md="3">
                        <CImg
                            src={props.edit.editRow.item && props.edit.editRow.item.anh_chan_dung}
                            alt={props.edit.editRow.item && props.edit.editRow.item.anh_chan_dung}
                            fluid
                            className="img-fluid"
                        />
                    </CCol>
                    <CCol>
                        <CRow>
                            <CCol>
                                <CFormGroup>
                                    <CLabel>Họ và tên</CLabel>
                                    <CInput
                                        placeholder="Họ và tên"
                                        defaultValue={props.edit.editRow.item && props.edit.editRow.item.ho_va_ten}
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
                                        defaultValue={props.edit.editRow.item && props.edit.editRow.item.ngay_sinh}
                                    />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel>Giới tính</CLabel>
                                    <CSelect custom
                                        value={props.edit.editRow.item && props.edit.editRow.item.gioi_tinh}
                                    >
                                        <option value="M">Nam</option>
                                        <option value="F">Nữ</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel>CMND</CLabel>
                                    <CInput
                                        placeholder="CMND"
                                        defaultValue={props.edit.editRow.item && props.edit.editRow.item.so_cmt}
                                    />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        {props.edit.inputList.map((x, i) => {
                            return (
                                <CRow key={i}>
                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel>RFID</CLabel>
                                            <CInput
                                                placeholder="RFID"
                                                name="rfid_card"
                                                defaultValue={props.edit.editRow.item && props.edit.editRow.item.rfid_card}
                                            />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" md="6">
                                        <CFormGroup>
                                            <CLabel>Số thẻ</CLabel>
                                            <CInput
                                                placeholder="Số thẻ"
                                                name="rfid_card_name"
                                                defaultValue={props.edit.editRow.item && props.edit.editRow.item.rfid_card_name}
                                            />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                            )
                        })}
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton color="info" onClick={updateInfo}>
                    {props.edit.editRow.loading ? <CSpinner className="mr-2" component="span" size="sm" aria-hidden="true" style={{ marginBottom: "0.1rem" }} /> : ""}
                    Cập nhật
                </CButton>
                <CButton color="info" onClick={updateRfCard}>
                    {props.edit.editRow.loadingRfCard ? <CSpinner className="mr-2" component="span" size="sm" aria-hidden="true" style={{ marginBottom: "0.1rem" }} /> : ""}
                    Cấp thẻ mới
                </CButton>
                <CButton color="secondary" onClick={closeModal}>
                    Hủy
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalEdit