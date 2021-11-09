import React, { useEffect, useState } from 'react'
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
import { editAttendanceDevicesID, getAttendanceDevices, updateAttendanceDevicesID } from 'src/services/attendanceService';
import { Input, Select } from 'antd';

const { Option } = Select;
const { Search } = Input;

const ModalEdit = (props) => {
    console.log(props);
    const fields = [
        { key: "name", label: "Tên máy", },
        { key: "manufacture", label: "Model/NSX", },
        { key: "serial_no", label: "Serial", },
        { key: "firmware", label: "Firmware", },
        { key: "config", label: "Ghi chú", },
        { key: "branch", label: "Phân hiệu", },
    ];
    const [obAdd, setObAdd] = useState({
        name: "",
        serial_no: "",
        manufacture: "",
        firmware: "",
        status: false,
        config: "",
        branch: 0
    })
    const closeModal = () => {
        props.edit.setEditRow({ ...props.edit.editRow, on_off: false })
    }
    const onChange = (key, value) => {
        switch (key) {
            case 'name':
                setObAdd({ ...obAdd, name: value.target.value })
                break;
            case 'manufacture':
                setObAdd({ ...obAdd, manufacture: value.target.value })
                break;
            case 'serial_no':
                setObAdd({ ...obAdd, serial_no: value.target.value })
                break;
            case 'firmware':
                setObAdd({ ...obAdd, firmware: value.target.value })
                break;
            case 'config':
                setObAdd({ ...obAdd, config: value.target.value })
                break;
            case 'branch':
                setObAdd({ ...obAdd, branch: value })
                break;

            default:
                break;
        }
    }
    const updateTrackingDevice = () => {
        props.edit.setEditRow({ ...props.edit.editRow, disable: true, loading: true })
        async function updateAttendanceDevices() {
            const ob = { ...obAdd, branch_id: props.edit.editRow && props.edit.editRow.item.id }
            try {
                const update = await updateAttendanceDevicesID(props.edit.editRow && props.edit.editRow.item.id, ob);
                if (update.statusText === "OK") {
                    async function fetchAttendanceDevices() {
                        try {
                            const attendanceDevices = await getAttendanceDevices(props.edit.filter);
                            props.edit.setAttendanceDevices(attendanceDevices.data.items.sort(function (a, b) {
                                return a.id - b.id;
                            }));
                            props.edit.setTotalpages(attendanceDevices.data.total)
                        } catch (error) {
                        }
                    }
                    fetchAttendanceDevices();
                    props.edit.callToast(`Cập nhật thành công máy điểm danh ${props.edit.editRow.item.name}!`, 2)
                    props.edit.setEditRow({ ...props.edit.editRow, on_off: false, loading: false })
                }
            } catch (error) {
                props.edit.callToast(`Cập nhật không thành công máy điểm danh ${props.edit.editRow.item.name}!`, 3)
                props.edit.setEditRow({ ...props.edit.editRow, disable: false, loading: false })
            }
        }
        updateAttendanceDevices();
    }
    useEffect(() => {
        if (props.edit.editRow && props.edit.editRow.item) {
            async function editTrackingDevice() {
                try {
                    const edit = await editAttendanceDevicesID(props.edit.editRow && props.edit.editRow.item.id);
                    // console.log(edit.data);
                    setObAdd({
                        ...obAdd,
                        name: edit.data.name,
                        serial_no: edit.data.serial_no,
                        manufacture: edit.data.manufacture,
                        firmware: edit.data.firmware,
                        config: edit.data.config,
                        branch: edit.data.branch.id
                    })
                } catch (error) {
                }
            }
            editTrackingDevice();
        }
    }, [props.edit.editRow && props.edit.editRow.item])
    return (
        <CModal
            show={props.edit.editRow.on_off}
            onClose={closeModal}
            color=""
            closeOnBackdrop={false}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>Cập nhật thông tin máy điểm danh</CModalTitle>
            </CModalHeader>
            <CModalBody className="attendance-devices">
                <CFormGroup row>
                    {fields.map(item => {
                        if (item.key === 'config') {
                            return <CCol xs='12' key={item.key}>
                                <CFormGroup row>
                                    <CLabel>{item.label}</CLabel>
                                    <CCol>
                                        <CTextarea onChange={(value) => onChange(item.key, value)} defaultValue={obAdd[item.key]} />
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                        }
                        if (item.key === 'branch') {
                            return (props.edit.branches && props.edit.branches.length > 1) ?
                                <CCol xs='12' key={item.key}>
                                    <CFormGroup row>
                                        <CLabel>{item.label}</CLabel>
                                        <CCol>
                                            <Select defaultValue={"Tất cả"} value={obAdd[item.key]} style={{ width: "100%" }} onSelect={(value) => onChange(item.key, value)}>
                                                <Option key={0} value={0}>Tất cả</Option>
                                                {props.edit.branches.map((item, index) => {
                                                    return <Option key={item.id} value={item.id}>{item.name}</Option>
                                                })}
                                            </Select>
                                        </CCol>
                                    </CFormGroup>
                                </CCol> : undefined
                        } else {
                            return <CCol xs='12' md="6" key={item.key}>
                                <CFormGroup row>
                                    <CLabel>{item.label}</CLabel>
                                    <CCol>
                                        <CInput onChange={(value) => onChange(item.key, value)} defaultValue={obAdd[item.key]} disabled={item.key === 'firmware' ? true : false} />
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                        }
                    })}
                </CFormGroup>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => updateTrackingDevice()} color="info" disabled={props.edit.editRow.disable}>
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