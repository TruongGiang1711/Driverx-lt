import React, { useRef, useState } from 'react'
import {
    CButton,
    CRow,
    CCol,
    CFormGroup,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CLabel,
    CSpinner,
    CInput,
    CTextarea,
} from '@coreui/react'
import { addAttendanceDevices, getAttendanceDevices } from 'src/services/attendanceService'
import { Input, Select } from 'antd';

const { Option } = Select;
const { Search } = Input;

const ModalAdd = (props) => {
    const resetForm = useRef({})
    const fields = [
        { key: "name", label: "Tên máy", },
        { key: "manufacture", label: "Model/NSX", },
        { key: "serial_no", label: "Serial", },
        { key: "firmware", label: "Firmware", },
        { key: "config", label: "Ghi chú", },
        // { key: "branch", label: "Phân hiệu", },
    ];
    const [obAdd, setObAdd] = useState({
        name: "",
        serial_no: "",
        manufacture: "",
        firmware: "",
        status: false,
        config: "",
        branch_id: 0
    })
    const onChange = (key, value) => {
        const val = value.target.value;
        switch (key) {
            case 'name':
                setObAdd({ ...obAdd, name: val })
                break;
            case 'manufacture':
                setObAdd({ ...obAdd, manufacture: val })
                break;
            case 'serial_no':
                setObAdd({ ...obAdd, serial_no: val })
                break;
            case 'firmware':
                setObAdd({ ...obAdd, firmware: val })
                break;
            case 'config':
                setObAdd({ ...obAdd, config: val })
                break;

            default:
                break;
        }
    }
    const closeModal = () => {
        props.add.setAddRow({ ...props.add.addRow, on_off: false, })
    }
    const onAddTrackingDevice = () => {
        props.add.setAddRow({ ...props.add.addRow, disable: true, loading: true })
        async function addTrackingDevice() {
            const ob = { ...obAdd, branch_id: props.add.addRow.branch_id }
            try {
                const add = await addAttendanceDevices(ob);
                // console.log(add);
                if (add.statusText === "OK") {
                    async function fetchAttendanceDevices() {
                        try {
                            const attendanceDevices = await getAttendanceDevices(props.add.filter);
                            props.add.setAttendanceDevices(attendanceDevices.data.items.sort(function (a, b) {
                                return a.id - b.id;
                            }));
                            props.add.setTotalpages(attendanceDevices.data.total)
                        } catch (error) {
                        }
                    }
                    fetchAttendanceDevices();
                    props.add.callToast(`Thêm máy điểm danh thành công!`, 2)
                    props.add.setAddRow({ ...props.add.addRow, on_off: false, loading: false })
                    resetFormAttendanceDevices()
                }
            } catch (error) {
                props.add.callToast(`Thêm máy điểm danh không thành công!`, 3)
                props.add.setAddRow({ ...props.add.addRow, on_off: true })
                resetFormAttendanceDevices()
            }
        }
        addTrackingDevice()
    }
    const resetFormAttendanceDevices = () => {
        fields.map(item => resetForm.current[item.key].value = '')
    }
    return (
        <CModal
            show={props.add.addRow.on_off}
            onClose={closeModal}
            color="info"
            closeOnBackdrop={false}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>Thêm máy điểm danh</CModalTitle>
            </CModalHeader>
            <CModalBody className="attendance-devices">
                <CFormGroup row>
                    {fields.map(item => {
                        if (item.key === 'config') {
                            return <CCol xs='12' key={item.key}>
                                <CFormGroup row>
                                    <CLabel>{item.label}</CLabel>
                                    <CCol>
                                        <CTextarea onChange={(value) => onChange(item.key, value)} innerRef={el => resetForm.current[item.key] = el} />
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                        }
                        // if (item.key === 'branch') {
                        //     return (props.add.branches && props.add.branches.length > 1) ?
                        //         <CCol xs='12' key={item.key}>
                        //             <CFormGroup row>
                        //                 <CLabel>{item.label}</CLabel>
                        //                 <CCol>
                        //                     <Select defaultValue="Tất cả" style={{ width: "100%" }}>
                        //                         <Option key={0} value={0}>Tất cả</Option>
                        //                         {props.add.branches.map((item, index) => {
                        //                             return <Option key={item.id} value={item.id}>{item.name}</Option>
                        //                         })}
                        //                     </Select>
                        //                 </CCol>
                        //             </CFormGroup>
                        //         </CCol> : undefined
                        // }
                        else {
                            return <CCol xs='12' md="6" key={item.key}>
                                <CFormGroup row>
                                    <CLabel>{item.label}</CLabel>
                                    <CCol>
                                        <CInput onChange={(value) => onChange(item.key, value)} innerRef={el => resetForm.current[item.key] = el} disabled={item.key === 'firmware' ? true : false} />
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                        }
                    })}
                </CFormGroup>
            </CModalBody>
            <CModalFooter>
                <CButton color="info" onClick={() => onAddTrackingDevice()} disabled={props.add.addRow.disable}>
                    {props.add.addRow.loading ? <CSpinner className="mr-2" component="span" size="sm" aria-hidden="true" style={{ marginBottom: "0.1rem" }} /> : ""}
                    Đồng ý
                </CButton>
                <CButton color="secondary" onClick={closeModal}>
                    Hủy
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalAdd;