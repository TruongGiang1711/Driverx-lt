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
import { addTrackingDevices, getTrackingDevices } from 'src/services/devicesService'

const ModalAdd = (props) => {
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
            case 'serial':
                setObAdd({ ...obAdd, serial_no: val })
                break;
            case 'model':
                setObAdd({ ...obAdd, manufacture: val })
                break;
            case 'sim':
                setObAdd({ ...obAdd, sim: val })
                break;
            case 'imei':
                setObAdd({ ...obAdd, imei: val })
                break;
            case 'note':
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
                console.log(add);
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
                    // document.getElementById("tracking-devices-form").reset();
                }
            } catch (error) {
                props.add.callToast(`Thêm thiết bị không thành công!`, 3)
                props.add.setAddRow({ ...props.add.addRow, on_off: true })
            }
        }
        addTrackingDevice()
    }
    return (
        <CModal
            show={props.add.addRow.on_off}
            onClose={closeModal}
            color="info"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Thêm máy</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CFormGroup id="tracking-devices-form">
                    <CRow>
                        <CCol>
                            <CLabel>Serial</CLabel>
                            <CInput onChange={(value) => onChange('serial', value)} />
                        </CCol>
                        <CCol>
                            <CLabel>Model</CLabel>
                            <CInput onChange={(value) => onChange('model', value)} />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CLabel>Số SIM</CLabel>
                            <CInput onChange={(value) => onChange('sim', value)} />
                        </CCol>
                        <CCol>
                            <CLabel>IMEI</CLabel>
                            <CInput onChange={(value) => onChange('imei', value)} />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CLabel>Ghi chú</CLabel>
                            <CTextarea onChange={(value) => onChange('note', value)} />
                        </CCol>
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