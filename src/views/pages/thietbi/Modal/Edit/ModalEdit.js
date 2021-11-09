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
import { editTrackingDevicesID, getTrackingDevices, updateTrackingDevicesID } from 'src/services/devicesService';

const ModalEdit = (props) => {
    // console.log(props);
    const fields = [
        { key: "serial_no", label: "Serial", },
        { key: "manufacture", label: "Model", },
        { key: "sim", label: "Số SIM", },
        { key: "imei", label: "IMEI", },
        { key: "config", label: "Ghi chú", },
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
    const closeModal = () => {
        props.edit.setEditRow({ ...props.edit.editRow, on_off: false })
    }
    const onChange = (key, value) => {
        const val = value.target.value;
        switch (key) {
            case 'serial_no':
                setObAdd({ ...obAdd, serial_no: val })
                break;
            case 'manufacture':
                setObAdd({ ...obAdd, manufacture: val })
                break;
            case 'sim':
                setObAdd({ ...obAdd, sim: val })
                break;
            case 'imei':
                setObAdd({ ...obAdd, imei: val })
                break;
            case 'config':
                setObAdd({ ...obAdd, config: val })
                break;

            default:
                break;
        }
    }
    const updateTrackingDevice = () => {
        props.edit.setEditRow({ ...props.edit.editRow, disable: true, loading: true })
        async function updateTrackingDevices() {
            const ob = { ...obAdd, branch_id: props.edit.editRow && props.edit.editRow.item.id }
            try {
                const update = await updateTrackingDevicesID(props.edit.editRow && props.edit.editRow.item.id, ob);
                if (update.statusText === "OK") {
                    async function fetchTrackingDevices() {
                        try {
                            const trackingDevices = await getTrackingDevices(props.edit.filter);
                            props.edit.setTrackingDevices(trackingDevices.data.items.sort(function (a, b) {
                                return a.id - b.id;
                            }));
                            props.edit.setTotalpages(trackingDevices.data.total)
                        } catch (error) {
                        }
                    }
                    fetchTrackingDevices();
                    props.edit.callToast(`Cập nhật thành công thiết bị ${props.edit.editRow.item.manufacture}!`, 2)
                    props.edit.setEditRow({ ...props.edit.editRow, on_off: false, loading: false })
                }
            } catch (error) {
                props.edit.callToast(`Cập nhật không thành công thiết bị ${props.edit.editRow.item.manufacture}!`, 3)
                props.edit.setEditRow({ ...props.edit.editRow, disable: false, loading: false })
            }
        }
        updateTrackingDevices();
    }
    useEffect(() => {
        if (props.edit.editRow && props.edit.editRow.item) {
            async function editTrackingDevice() {
                try {
                    const edit = await editTrackingDevicesID(props.edit.editRow && props.edit.editRow.item.id);
                    // console.log(edit.data);
                    setObAdd({
                        ...obAdd,
                        serial_no: edit.data.serial_no,
                        manufacture: edit.data.manufacture,
                        config: edit.data.config,
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
        >
            <CModalHeader closeButton>
                <CModalTitle>Cập nhật thông tin thiết bị</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CFormGroup>
                    <CRow>
                        {fields.map(item => {
                            if (item.key === 'config') {
                                return <CCol xs='12' key={item.key} >
                                    <CLabel>{item.label}</CLabel>
                                    <CTextarea onChange={(value) => onChange(item.key, value)} defaultValue={obAdd[item.key]} />
                                </CCol>
                            } else {
                                return <CCol xs='12' md='6' key={item.key}>
                                    <CLabel>{item.label}</CLabel>
                                    <CInput onChange={(value) => onChange(item.key, value)} defaultValue={obAdd[item.key]} disabled={item.key === 'imei' ? true : false} />
                                </CCol>
                            }
                        })}
                    </CRow>
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