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
import { addTrackingDevices, getTrackingDevices } from 'src/services/devicesService'

const ModalAdd = (props) => {
    const resetForm = useRef({})
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
    const closeModal = () => {
        props.add.setAddRow({ ...props.add.addRow, on_off: false, })
    }
    const onAddTrackingDevice = () => {
        props.add.setAddRow({ ...props.add.addRow, disable: true, loading: true })
        async function addTrackingDevice() {
            const ob = { ...obAdd, branch_id: props.add.addRow.branch_id }
            try {
                const add = await addTrackingDevices(ob);
                // console.log(add);
                if (add.statusText === "OK") {
                    async function fetchTrackingDevices() {
                        try {
                            const trackingDevices = await getTrackingDevices(props.add.filter);
                            props.add.setTrackingDevices(trackingDevices.data.items.sort(function (a, b) {
                                return a.id - b.id;
                            }));
                            props.add.setTotalpages(trackingDevices.data.total)
                        } catch (error) {
                        }
                    }
                    fetchTrackingDevices();
                    props.add.callToast(`Thêm thiết bị thành công!`, 2)
                    props.add.setAddRow({ ...props.add.addRow, on_off: false, loading: false })
                    resetFormTrackingDevices()
                }
            } catch (error) {
                props.add.callToast(`Thêm thiết bị không thành công!`, 3)
                props.add.setAddRow({ ...props.add.addRow, on_off: true })
                resetFormTrackingDevices()
            }
        }
        addTrackingDevice()
    }
    const resetFormTrackingDevices = () => {
        fields.map(item => resetForm.current[item.key].value = '')
    }
    return (
        <CModal
            show={props.add.addRow.on_off}
            onClose={closeModal}
            color="info"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Thêm thiết bị</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CFormGroup>
                    <CRow>
                        {fields.map(item => {
                            if (item.key === 'config') {
                                return <CCol xs='12'>
                                    <CLabel>{item.label}</CLabel>
                                    <CTextarea key={item.key} onChange={(value) => onChange(item.key, value)} innerRef={el => resetForm.current[item.key] = el} />
                                </CCol>
                            } else {
                                return <CCol xs='12' md='6'>
                                    <CLabel>{item.label}</CLabel>
                                    <CInput key={item.key} onChange={(value) => onChange(item.key, value)} innerRef={el => resetForm.current[item.key] = el} disabled={item.key === 'imei' ? true : false} />
                                </CCol>
                            }
                        })}
                    </CRow>
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