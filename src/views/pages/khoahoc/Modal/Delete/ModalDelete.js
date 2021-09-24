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
                    props.delete.setDeleteRow({ ...props.delete.deleteRow, delData: del.data.success, on_off: false, loading: false })
                    async function fetchCourses() {
                        try {
                            const courses = await getCourses(props.delete.filter);
                            // console.log(courses);
                            props.delete.setCourses(courses.data.items);
                            props.delete.setTotalpages(courses.data.total)
                        } catch (error) {
                        }
                    }
                    fetchCourses();
                    props.delete.setToasts([
                        ...props.delete.toasts,
                        {
                            position: 'top-right',
                            autohide: true && 5000,
                            closeButton: true,
                            fade: true,
                            show: true,
                            item: undefined,
                            value: 0,
                            error: `Xóa thành công khóa học ${props.delete.deleteRow.item.ten_khoa_hoc}!`,
                            statusColor: -1,
                        }
                    ])
                }
            } catch (error) {
                props.delete.setToasts([
                    ...props.delete.toasts,
                    {
                        position: 'top-right',
                        autohide: true && 5000,
                        closeButton: true,
                        fade: true,
                        show: true,
                        item: undefined,
                        value: 0,
                        error: `Khóa học ${props.delete.deleteRow.item.ten_khoa_hoc} đã được bắt đầu hoặc thẻ được chỉ định cho khóa học!`,
                        statusColor: -1,
                    }
                ])
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
                <CButton color="danger" onClick={closeModal}>
                    Hủy
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalDelete