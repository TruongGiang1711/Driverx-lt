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
import { deleteAttendanceDevices } from 'src/services/attendanceService';

const ModalDelete = (props) => {
    // console.log(props);
    const closeModal = () => {
        props.delete.setDeleteRow({ ...props.delete.deleteRow, on_off: false })
    }
    const onDeleteRow = (id) => {
        props.delete.setDeleteRow({ ...props.delete.deleteRow, disable: true, loading: true })
        async function deleteTrackingDeviceID() {
            try {
                const del = await deleteAttendanceDevices(id);
                if (del.data.success === true) {
                    const oldAttendanceDevices = [...props.delete.attendanceDevices]
                    const newAttendanceDevices = oldAttendanceDevices.filter(e => e.id !== id)
                    props.delete.setAttendanceDevices(newAttendanceDevices);
                    props.delete.callToast(`Xóa thành công máy điểm danh ${props.delete.deleteRow.item.manufacture}!`, 2)
                    props.delete.setDeleteRow({ ...props.delete.deleteRow, delData: del.data.success, on_off: false, loading: false })
                }
            } catch (error) {
                props.delete.callToast(`Máy điểm danh ${props.delete.deleteRow.item.manufacture} không tìm thấy!`, 3)
                props.delete.setDeleteRow({ ...props.delete.deleteRow, disable: false, loading: false })
            }
        }
        deleteTrackingDeviceID()
    }
    return (
        <CModal
            show={props.delete.deleteRow.on_off}
            onClose={closeModal}
            color="danger"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Xóa máy điểm danh</CModalTitle>
            </CModalHeader>
            <CModalBody>Bạn có muốn xóa máy điểm danh {props.delete.deleteRow.item && props.delete.deleteRow.item.name}</CModalBody>
            <CModalFooter>
                <CButton color="danger" onClick={() => onDeleteRow(props.delete.deleteRow.item && props.delete.deleteRow.item.id)} disabled={props.delete.deleteRow.disable}>
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