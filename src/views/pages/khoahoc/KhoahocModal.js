import React, { useEffect } from 'react'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CToaster,
    CToast,
    CToastHeader,
    CToastBody,
    CInput,
} from '@coreui/react'
import { addCourse, deleteCourse } from "src/services/userService";

export const ModalAddRow = (props) => {
    const selectFile = () => {
        async function addCourses() {
            const dataArray = new FormData();
            dataArray.append("file", props.addRow.file);
            dataArray.append("branch_id", props.addRow.branch_id);
            console.log(dataArray);
            // const ob = {
            //     file: props.addRow.item,
            //     branch_id: props.addRow.branch_id
            // }
            try {
                const add = await addCourse(dataArray, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log(add);
            } catch (error) {
            }
        }
        addCourses()
    }
    return (
        <CModal
            show={props.addRow.on_off}
            onClose={() => props.setAddRow({ ...props.addRow, on_off: !props.addRow.on_off })}
            color="info"
        >
            <CModalHeader closeButton>
                <CModalTitle>Modal title</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CInput
                    type="file"
                    onChange={(value) => props.setAddRow({ ...props.addRow, item: value.target.files })}
                />
            </CModalBody>
            <CModalFooter>
                <CButton color="info" onClick={selectFile}>
                    Do Something
                </CButton>{' '}
                <CButton color="info" onClick={() => props.setAddRow(!props.addRow)}>
                    Cancel
                </CButton>
            </CModalFooter>
        </CModal>
    )
}
export const ModalDeleteRow = (props) => {
    const onDeleteRow = (id) => {
        async function deleteCourseID() {
            console.log(id);
            try {
                const courses = await deleteCourse(id);
                console.log(courses);
            } catch (error) {
            }
            // setDeleteRow(!deleteRow.on_off)
        }
        deleteCourseID()
    }
    return (
        <CModal
            show={props.deleteRow.on_off}
            onClose={() => props.setDeleteRow(!props.deleteRow.on_off)}
            color="danger"
        >
            {/* <CModalHeader closeButton>
                <CModalTitle></CModalTitle>
            </CModalHeader> */}
            <CModalBody>Bạn có muốn xóa khóa học {props.deleteRow.item && props.deleteRow.item.ten_khoa_hoc}</CModalBody>
            <CModalFooter>
                <CButton color="danger" onClick={onDeleteRow(props.deleteRow.item && props.deleteRow.item.id)}>
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

export const Toaster = (props) => {
    console.log(props);
    useEffect(() => {
        if (props.toast.show === true)
            props.setToast({ ...props.toast, show: false })
    }, [props.toast.show])
    return <CToaster
        position={props.toast.position}
    >
        <CToast
            key={'toast'}
            show={props.toast.show}
            autohide={true && 3000}
        >
            <CToastHeader>
                Toast title
            </CToastHeader>
            <CToastBody>
                {`This is a toast in positioned toaster number.`}
            </CToastBody>
        </CToast>
    </CToaster>
}