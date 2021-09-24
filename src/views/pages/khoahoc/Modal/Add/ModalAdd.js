import React, { useEffect } from 'react'
import {
    CButton,
    CCol,
    CFormGroup,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CLabel,
    CSpinner,
    CInputFile,
} from '@coreui/react'
import { addCourse, getCourses } from 'src/services/coursesService'

const ModalAdd = (props) => {
    const onChangeFile = (value) => {
        if (value.target.files.length > 0) {
            props.add.setAddRow({ ...props.add.addRow, nameFile: value.target.files[0].name, file: value.target.files })
        } else {
            props.add.setAddRow({ ...props.add.addRow, nameFile: undefined, file: undefined })
        }
    }
    const closeModal = () => {
        props.add.setAddRow({ ...props.add.addRow, on_off: false, })
    }
    const onAddFileXML = () => {
        props.add.setAddRow({ ...props.add.addRow, disable: true, loading: true })
        async function addCourseXML() {
            const formData = new FormData();
            formData.append("file", props.add.addRow.file && props.add.addRow.file[0]);
            formData.append("branch_id", props.add.addRow.branch_id);
            try {
                const add = await addCourse(formData);
                if (add.statusText === "OK") {
                    props.add.setAddRow({ ...props.add.addRow, hasData: add.statusText, nameFile: undefined, file: undefined, on_off: false, loading: false })
                    async function fetchCourses() {
                        try {
                            const courses = await getCourses(props.add.filter);
                            // console.log(courses);
                            props.add.setCourses(courses.data.items);
                            props.add.setTotalpages(courses.data.total)
                        } catch (error) {
                        }
                    }
                    fetchCourses();
                    props.add.setToasts([
                        ...props.add.toasts,
                        {
                            position: 'top-right',
                            autohide: true && 5000,
                            closeButton: true,
                            fade: true,
                            show: true,
                            item: undefined,
                            value: 0,
                            error: `Thêm khóa thành công!`,
                            statusColor: -1,
                        }
                    ])
                }
            } catch (error) {
                props.add.setAddRow({ ...props.add.addRow, nameFile: undefined, on_off: true })
                props.add.setToasts([
                    ...props.add.toasts,
                    {
                        position: 'top-right',
                        autohide: true && 5000,
                        closeButton: true,
                        fade: true,
                        show: true,
                        item: undefined,
                        value: 0,
                        error: `Thêm khóa không thành công!`,
                        statusColor: -1,
                    }
                ])
            }
        }
        addCourseXML()
    }
    useEffect(() => {
        if (props.add.addRow.nameFile === undefined)
            document.getElementById("custom-file-input").value = "";
    }, [props.add.addRow.nameFile])
    return (
        <CModal
            show={props.add.addRow.on_off}
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
                        <CInputFile custom id="custom-file-input" onChange={(value) => onChangeFile(value)} disabled={props.add.addRow.loading ? true : false} />
                        <CLabel htmlFor="custom-file-input" variant="custom-file">
                            {props.add.addRow.nameFile ? props.add.addRow.nameFile : "Chọn file XML"}
                        </CLabel>
                    </CCol>
                </CFormGroup>
            </CModalBody>
            <CModalFooter>
                <CButton color="info" onClick={() => onAddFileXML()} disabled={props.add.addRow.disable}>
                    {props.add.addRow.loading ? <CSpinner className="mr-2" component="span" size="sm" aria-hidden="true" style={{ marginBottom: "0.1rem" }} /> : ""}
                    Đồng ý
                </CButton>
                <CButton color="info" onClick={closeModal}>
                    Hủy
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalAdd;