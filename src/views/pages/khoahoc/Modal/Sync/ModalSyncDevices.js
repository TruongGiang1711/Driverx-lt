import React, { useEffect, useState } from "react";
import {
    CButton,
    CCol,
    CFormGroup,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CInput,
    CLabel,
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CDataTable,
    CListGroup,
    CListGroupItem,
    CFade,
    CLink,
    CInputCheckbox,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { getDevices } from "src/services/deviceService";
import { addDevicesCourse, deleteDevicesCourse, getDevicesCourse } from "src/services/courseService";

const ModalSyncDevices = (props) => {
    // console.log(props);
    const fields = [
        {
            key: "stt",
            label: "STT",
        },
        {
            key: "name",
            label: "Tên máy",
        },
        {
            key: "model",
            label: "Model",
        },
        {
            key: "checkbox_row",
            label: "",
        },
    ];
    const [valueInput, setValueInput] = useState('');
    const [devices, setDevices] = useState([]);                     // danh sach thiet bi cua phan hieu
    const [deviesInCourse, setDeviesInCourse] = useState([]);       // danh sach thiet bi cua khoa hoc mới
    const [deviesInCourseOld, setDeviesInCourseOld] = useState([]); // danh sach thiet bi cua khoa hoc cũ
    const closeModal = () => {
        props.sync.setSyncRowDevice({
            ...props.sync.syncRowDevice,
            on_off: !props.sync.syncRowDevice.on_off,
        });
    };
    const changeSyncRow = (key, value) => {
        switch (key) {
            case 'course':

                break;
            case 'hang':

                break;
            case 'siso':

                break;
            case 'branch':

                break;

            default:
                break;
        }
    }
    const changeCheck = (item, value) => {
        // console.log(item);
        // console.log(value.target.checked);
        const oldDevices = [...devices];
        const index = oldDevices.findIndex((x) => x.id === item.id);
        oldDevices[index].selected = value !== false ? value.target.checked : value;
        setDevices(oldDevices);
        setDeviesInCourse(getDevicesInCoures(oldDevices));
    };
    const getDevicesInCoures = (devices) => {
        const result = devices.filter((d) => d.selected);
        // console.log("getDevicesInCoures result", result);
        return result && result.length > 0 ? result : [];
    };
    const handleOnTableFilterChange = (value) => {
        setValueInput(value.target.value)
    }
    const updateListInCourse = () => {
        // console.log(deviesInCourseOld);
        const listCu = [...deviesInCourseOld]; //["may 1","may 2"]
        //object destructoring
        //result = ["may 1","may fk"]
        //listCu = []
        async function xoa() {
            listCu.map((item) => {
                const khong = deviesInCourse.some(d => d.id === item.id)
                if (khong !== true) {
                    // console.log("ko có trong list cũ ====", item);
                    async function deleteDevice() {
                        try {
                            const result = await deleteDevicesCourse(props.sync.syncRowDevice.item.id, item.id);
                            // console.log(result);
                            if (result.data.success === true) {
                                props.sync.setToasts([
                                    ...props.sync.toasts,
                                    {
                                        position: 'top-right',
                                        autohide: true && 3000,
                                        closeButton: true,
                                        fade: true,
                                        show: true,
                                        item: undefined,
                                        value: 0,
                                        error: `Xóa thành công thiết bị ${item.name} của khóa học ${props.sync.syncRowDevice.item.ten_khoa_hoc}!`,
                                        statusColor: -1,
                                    }
                                ])
                            }
                        } catch (error) {
                            props.sync.setToasts([
                                ...props.sync.toasts,
                                {
                                    position: 'top-right',
                                    autohide: true && 3000,
                                    closeButton: true,
                                    fade: true,
                                    show: true,
                                    item: undefined,
                                    value: 0,
                                    error: `Xóa không thành công thiết bị ${item.name} của khóa học ${props.sync.syncRowDevice.item.ten_khoa_hoc}!`,
                                    statusColor: -1,
                                }
                            ])
                        }
                    }
                    deleteDevice()
                }
            });
        }
        async function them() {
            deviesInCourse.map((item) => {
                const co = listCu.some(d => d.id === item.id)
                if (co !== true) {
                    // console.log("có trong list mới ====", item);
                    async function addDevice() {
                        const ob = {
                            device_id: item.id,
                            status: 0,
                            auto_sync: true
                        }
                        try {
                            const result = await addDevicesCourse(props.sync.syncRowDevice.item.id, ob);
                            // console.log(result);
                            if (result.statusText === "OK") {
                                props.sync.setToasts([
                                    ...props.sync.toasts,
                                    {
                                        position: 'top-right',
                                        autohide: true && 3000,
                                        closeButton: true,
                                        fade: true,
                                        show: true,
                                        item: undefined,
                                        value: 0,
                                        error: `Thiết bị ${item.name} đã được gán thành công cho khóa học ${props.sync.syncRowDevice.item.ten_khoa_hoc}!`,
                                        statusColor: -1,
                                    }
                                ])
                            }
                        } catch (error) {
                            props.sync.setToasts([
                                ...props.sync.toasts,
                                {
                                    position: 'top-right',
                                    autohide: true && 3000,
                                    closeButton: true,
                                    fade: true,
                                    show: true,
                                    item: undefined,
                                    value: 0,
                                    error: `Thiết bị ${item.name} đã được gán cho khóa học ${props.sync.syncRowDevice.item.ten_khoa_hoc}!`,
                                    statusColor: -1,
                                }
                            ])
                        }
                    }
                    addDevice()
                }
            })
        }
        async function chung() {
            await xoa()
            await them()
            getApiDevicesCourse()
        }
        chung()
    }
    const getApiDevicesCourse = () => {
        // console.log(props.sync.syncRowDevice);
        let devices = [];
        let devicesInThisCourse = [];
        async function processGetDevices() {
            const ob = {
                name: '',
                serial: '',
                working_status: 0,
                sync_status: 0,
                province_id: 0,
                customer_id: 0,
                branch_id: props.sync.syncRowDevice.item && props.sync.syncRowDevice.item.branch_id,
                page: 1,
            }
            try {
                const result = await getDevices(ob);
                devices = result.data.items;
                // console.log("devices", devices);
            } catch (error) { }
        }
        async function processGetDeviceOfCourse() {
            try {
                const result = await getDevicesCourse(props.sync.syncRowDevice.item.id);
                devicesInThisCourse = result.data;
                // console.log(result.data);
            } catch (error) { }
        }
        async function process() {
            await processGetDevices();
            await processGetDeviceOfCourse();
            // console.log(devicesInThisCourse.length);
            devicesInThisCourse.map((d) => {
                const index = devices.findIndex((device) => device.id === d.device.id);
                if (index > -1) {
                    devices[index].selected = true;
                }
            });
            // console.log("devices", devices);
            setDevices(devices);
            setDeviesInCourse(getDevicesInCoures(devices));
            setDeviesInCourseOld(getDevicesInCoures(devices))
        }
        process();
    }
    useEffect(() => {
        getApiDevicesCourse()
    }, [props.sync.syncRowDevice && props.sync.syncRowDevice.item]);
    return (
        <CModal
            show={props.sync.syncRowDevice && props.sync.syncRowDevice.on_off}
            onClose={closeModal} size="lg"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Chỉ định Khóa tới Máy điểm danh</CModalTitle>
            </CModalHeader>
            <CModalBody className="course-to-vehicles">
                <CCard>
                    <CCardBody>
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup row>
                                    <CLabel>Khóa</CLabel>
                                    <CCol>
                                        <CInput
                                            placeholder="Khóa"
                                            defaultValue={
                                                props.sync.syncRowDevice &&
                                                props.sync.syncRowDevice.item &&
                                                props.sync.syncRowDevice.item.ten_khoa_hoc
                                            }
                                            onChange={(value) => changeSyncRow(value)}
                                            disabled
                                        />
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="3">
                                <CFormGroup row>
                                    <CLabel>Hạng</CLabel>
                                    <CCol>
                                        <CInput
                                            placeholder="Hạng"
                                            defaultValue={
                                                props.sync.syncRowDevice &&
                                                props.sync.syncRowDevice.item &&
                                                props.sync.syncRowDevice.item.hang_gplx
                                            }
                                            onChange={(value) => changeSyncRow(value)}
                                            disabled
                                        />
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="3">
                                <CFormGroup row>
                                    <CLabel>Sĩ số</CLabel>
                                    <CCol>
                                        <CInput
                                            placeholder="Sĩ số"
                                            defaultValue={
                                                props.sync.syncRowDevice &&
                                                props.sync.syncRowDevice.item &&
                                                props.sync.syncRowDevice.item.so_hoc_sinh
                                            }
                                            onChange={(value) => changeSyncRow(value)}
                                            disabled
                                        />
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CFormGroup row>
                                    <CLabel>Phân hiệu</CLabel>
                                    <CCol>
                                        <CInput
                                            placeholder="Phân hiệu"
                                            defaultValue={
                                                props.sync.syncRowDevice &&
                                                props.sync.syncRowDevice.item &&
                                                props.sync.syncRowDevice.item.branch_name
                                            }
                                            onChange={(value) => changeSyncRow(value)}
                                            disabled
                                        />
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
                <CCard className="border-0">
                    <CCardBody className="py-0">
                        <CFormGroup row className="mb-0">
                            <CLabel>Tìm máy</CLabel>
                            <CCol>
                                <CInput placeholder="Tìm máy..." onChange={handleOnTableFilterChange} />
                            </CCol>
                        </CFormGroup>
                    </CCardBody>
                </CCard>
                <CRow>
                    <CCol xs="12" lg="8" style={{ height: "200px" }}>
                        <CDataTable
                            items={devices}
                            fields={fields}
                            size="sm"
                            border
                            tableFilterValue={valueInput}
                            scopedSlots={{
                                stt: (item, index) => {
                                    return (
                                        <td>
                                            {/* {index + 1 + (page - 1) * 50} */}
                                            {index + 1}
                                        </td>
                                    );
                                },
                                model:
                                    (item) => (
                                        <td>
                                            {item.firmware}
                                        </td>
                                    ),
                                checkbox_row: (item, index) => {
                                    return (
                                        <td className="text-center">
                                            <span role="button">
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                    <CInputCheckbox
                                                        type="checkbox"
                                                        id={index}
                                                        name={item.name}
                                                        onChange={(value) => changeCheck(item, value)}
                                                        checked={item.selected || false}
                                                    />
                                                </CFormGroup>
                                                {/* <DeleteTwoTone twoToneColor="#e55353" onClick={() => setDeleteRow({ item: item, on_off: true })} /> */}
                                            </span>
                                        </td>
                                    );
                                },
                            }}
                        />
                    </CCol>
                    <CCol xs="12" lg="4">
                        <CCard className="card-sm h-100">
                            <CCardHeader color="secondary">Gán {deviesInCourse.length}/{devices.length} máy</CCardHeader>
                            <CListGroup className="list-group-sm">
                                {deviesInCourse.map((item) => {
                                    return (
                                        <CFade key={item.id}>
                                            <CListGroupItem className="justify-content-between">
                                                {item.name}
                                                <CLink
                                                    className="card-header-action float-right"
                                                    onClick={() => changeCheck(item, false)}
                                                >
                                                    <CIcon name="cil-x-circle" />
                                                </CLink>
                                            </CListGroupItem>
                                        </CFade>
                                    );
                                })}
                            </CListGroup>
                        </CCard>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton color="info" onClick={updateListInCourse}>Cập nhật</CButton>
                <CButton color="secondary" onClick={closeModal}>
                    Hủy
                </CButton>
            </CModalFooter>
        </CModal>
    );
};

export default ModalSyncDevices;
