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
import { deleteCourse, getCourses } from 'src/services/coursesService'

const ModalDelete = (props) => {
    // console.log(props);
    const closeModal = () => {
        props.delete.setDeleteRow({ ...props.delete.deleteRow, on_off: false })
    }
    const onDeleteRow = (id) => {
        props.delete.setDeleteRow({ ...props.delete.deleteRow, disable: true, loading: true })
        async function deleteCourseID() {
            try {
                const del = await deleteCourse(id);
                if (del.data.success === true) {
                    const oldCourses = [...props.delete.courses]
                    const newCourses = oldCourses.filter(e => e.id !== id)
                    props.delete.setCourses(newCourses);
                    props.delete.callToast(`Xóa thành công khóa học ${props.delete.deleteRow.item.ten_khoa_hoc}!`, 2)
                    props.delete.setDeleteRow({ ...props.delete.deleteRow, delData: del.data.success, on_off: false, loading: false })
                }
            } catch (error) {
                props.delete.callToast(`Khóa học ${props.delete.deleteRow.item.ten_khoa_hoc} đã được bắt đầu hoặc thẻ được chỉ định cho khóa học!`, 3)
                props.delete.setDeleteRow({ ...props.delete.deleteRow, disable: false, loading: false })
            }
        }
        deleteCourseID()
    }
    return (
        <CModal
            show={props.delete.deleteRow.on_off}
            onClose={closeModal}
            color="danger"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Xóa khóa</CModalTitle>
            </CModalHeader>
            <CModalBody>Bạn có muốn xóa khóa học {props.delete.deleteRow.item && props.delete.deleteRow.item.ten_khoa_hoc}</CModalBody>
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