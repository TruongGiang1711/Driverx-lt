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
import { getVehicles } from "src/services/vehiclesService";
import { addVehiclesCourse, deleteVehiclesCourse, getVehiclesCourse } from "src/services/coursesService";

const ModalSyncVehicles = (props) => {
    // console.log(props);
    const fields = [
        {
            key: "stt",
            label: "STT",
        },
        {
            key: "plate",
            label: "Tên máy",
            _classes: 'col-mid'
        },
        {
            key: "checkbox_row",
            label: "",
        },
    ];
    const [valueInput, setValueInput] = useState('');
    const [vehicles, setVehicles] = useState([]);                       // danh sach thiet bi cua phan hieu
    const [vehicelsInCourse, setVehiclesInCourse] = useState([]);       // danh sach thiet bi cua khoa hoc mới
    const [vehicelsInCourseOld, setVehiclesInCourseOld] = useState([]); // danh sach thiet bi cua khoa hoc cũ
    const [page, setPage] = useState(1);
    const closeModal = () => {
        props.sync.setSyncRowVehicles({
            ...props.sync.syncRowVehicles,
            on_off: !props.sync.syncRowVehicles.on_off,
        });
    };
    const changeCheck = (item, value) => {
        const oldVehicles = [...vehicles];
        const index = oldVehicles.findIndex((x) => x.id === item.id);
        oldVehicles[index].selected = value !== false ? value.target.checked : value;
        setVehicles(oldVehicles);
        setVehiclesInCourse(getVehiclesInCoures(oldVehicles));
    };
    const getVehiclesInCoures = (vehicles) => {
        const result = vehicles.filter((d) => d.selected);
        return result && result.length > 0 ? result : [];
    };
    const handleOnTableFilterChange = (value) => {
        setValueInput(value.target.value)
    }
    const updateListInCourse = () => {
        const listCu = [...vehicelsInCourseOld];
        async function xoa() {
            listCu.map((item) => {
                const khong = vehicelsInCourse.some(d => d.id === item.id)
                if (khong !== true) {
                    // console.log("ko có trong list cũ ====", item);
                    async function deleteDevice() {
                        try {
                            const result = await deleteVehiclesCourse(props.sync.syncRowVehicles.item.id, item.id);
                            // console.log(result);
                            if (result.data.success === true) {
                                props.sync.callToast(`Xóa thành công thiết bị ${item.plate} của khóa học ${props.sync.syncRowVehicles.item.ten_khoa_hoc}!`)
                            }
                        } catch (error) {
                            props.sync.callToast(`Xóa không thành công thiết bị ${item.plate} của khóa học ${props.sync.syncRowVehicles.item.ten_khoa_hoc}!`)
                        }
                    }
                    deleteDevice()
                }
            });
        }
        async function them() {
            vehicelsInCourse.map((item) => {
                const co = listCu.some(d => d.id === item.id)
                if (co !== true) {
                    // console.log("có trong list mới ====", item);
                    async function addDevice() {
                        const ob = {
                            vehicle_id: item.id,
                            status: 0,
                            auto_sync: true
                        }
                        try {
                            const result = await addVehiclesCourse(props.sync.syncRowVehicles.item.id, ob);
                            // console.log(result);
                            if (result.statusText === "OK") {
                                props.sync.callToast(`Thiết bị ${item.plate} đã được gán thành công cho khóa học ${props.sync.syncRowVehicles.item.ten_khoa_hoc}!`)
                            }
                        } catch (error) {
                            props.sync.callToast(`Thiết bị ${item.plate} đã được gán cho khóa học ${props.sync.syncRowVehicles.item.ten_khoa_hoc}!`)
                        }
                    }
                    addDevice()
                }
            })
        }
        async function chung() {
            await xoa()
            await them()
            getApiVehiclesCourse()
        }
        chung()
    }
    const getApiVehiclesCourse = () => {
        let vehicles = [];
        let vehiclesInThisCourse = [];
        async function processGetVehicles(page) {
            const ob = {
                plate: '',
                branch_id: props.sync.syncRowVehicles.item && props.sync.syncRowVehicles.item.branch_id,
                customer_id: 0,
                province_id: 0,
                page: page,
            }
            try {
                const result = await getVehicles(ob);
                vehicles = result.data.items;
                setPage(result.data.total % result.data.size)
            } catch (error) { }
        }
        async function processGetDeviceOfCourse() {
            try {
                const result = await getVehiclesCourse(props.sync.syncRowVehicles.item.id);
                vehiclesInThisCourse = result.data;
            } catch (error) { }
        }
        async function process() {
            await processGetVehicles();
            // for (let index = 1; index <= page; index++) {
            //     const data = await processGetVehicles(index)
            //     const newData = [...vehicles, ...data]
            //     vehicles = newData
            // }
            await processGetDeviceOfCourse();
            vehiclesInThisCourse.map((d) => {
                const index = vehicles.findIndex((vehicle) => vehicle.id === d.vehicle.id);
                if (index > -1) {
                    vehicles[index].selected = true;
                }
            });
            setVehicles(vehicles);
            setVehiclesInCourse(getVehiclesInCoures(vehicles));
            setVehiclesInCourseOld(getVehiclesInCoures(vehicles))
        }
        process();
    }
    useEffect(() => {
        getApiVehiclesCourse()
    }, [props.sync.syncRowVehicles && props.sync.syncRowVehicles.item]);
    return (
        <CModal
            show={props.sync.syncRowVehicles && props.sync.syncRowVehicles.on_off}
            onClose={closeModal}
            size="xl"
            closeOnBackdrop={false}
            color=""
        >
            <CModalHeader closeButton>
                <CModalTitle>Chỉ định Khóa tới Xe</CModalTitle>
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
                                                props.sync.syncRowVehicles &&
                                                props.sync.syncRowVehicles.item &&
                                                props.sync.syncRowVehicles.item.ten_khoa_hoc
                                            }
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
                                                props.sync.syncRowVehicles &&
                                                props.sync.syncRowVehicles.item &&
                                                props.sync.syncRowVehicles.item.hang_gplx
                                            }
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
                                                props.sync.syncRowVehicles &&
                                                props.sync.syncRowVehicles.item &&
                                                props.sync.syncRowVehicles.item.so_hoc_sinh
                                            }
                                            disabled
                                        />
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CFormGroup row className="mb-0">
                                    <CLabel>Phân hiệu</CLabel>
                                    <CCol>
                                        <CInput
                                            placeholder="Phân hiệu"
                                            defaultValue={
                                                props.sync.syncRowVehicles &&
                                                props.sync.syncRowVehicles.item &&
                                                props.sync.syncRowVehicles.item.branch_name
                                            }
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
                    <CCol xs="12" lg="8" className="vehicles-table" style={{ maxHeight: "300px", overflow: "auto" }}>
                        <CDataTable
                            items={vehicles}
                            fields={fields}
                            size="sm"
                            border
                            tableFilterValue={valueInput}
                            scopedSlots={{
                                stt: (item, index) => {
                                    return (
                                        <td className="col-start">
                                            {/* {index + 1 + (page - 1) * 50} */}
                                            {index + 1}
                                        </td>
                                    );
                                },
                                // 'status':
                                //     (item) => (
                                //         <td>
                                //             <CBadge color={getBadge(item.status)}>
                                //                 {item.status}
                                //             </CBadge>
                                //         </td>
                                //     )
                                checkbox_row: (item, index) => {
                                    return (
                                        <td className="text-center col-end">
                                            <span role="button">
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                    <CInputCheckbox
                                                        type="checkbox"
                                                        id={index}
                                                        name={item.plate}
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
                            <CCardHeader color="secondary">Gán {vehicelsInCourse.length}/{vehicles.length} máy</CCardHeader>
                            <CListGroup className="list-group-sm">
                                {vehicelsInCourse.map((item) => {
                                    return (
                                        <CFade key={item.id}>
                                            <CListGroupItem className="justify-content-between">
                                                {item.plate}
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

export default ModalSyncVehicles;