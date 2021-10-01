import React, { useEffect, useState } from 'react'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CSpinner,
    CImg,
    CSelect,
    CCol,
    CRow,
    CFormGroup,
    CLabel,
    CInput,
    CDataTable,
    CInputCheckbox,
} from '@coreui/react'
import { getDevicesCourse } from 'src/services/coursesService';
import hand from './../../../../../assets/hand.png';
import { deleteFingerprintsTrainees } from 'src/services/traineesService';

const ModalFP = (props) => {
    // console.log(props);
    const [deviesInCourse, setDeviesInCourse] = useState([]); // danh sach thiet bi cua khoa hoc
    const [disabled, setDisabled] = useState(true);
    const [name, setName] = useState('Xóa');
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
            key: "manufacture",
            label: "Thiết bị",
        },
        {
            key: "serial",
            label: "Serial",
        },
        {
            key: "status",
            label: "Trạng thái",
        },
        {
            key: "checkbox_row",
            label: "",
        },
    ];
    const closeModal = () => {
        props.fp.setFPRow({ ...props.fp.fpRow, on_off: false })
    }
    const changeCheck = (item, value) => {
    };
    const getApiDevicesCourse = () => {
        async function processGetDeviceOfCourse() {
            try {
                const result = await getDevicesCourse(props.fp.fpRow.item.course_id);
                // console.log(result.data);
                setDeviesInCourse(result.data)
            } catch (error) { }
        }
        async function process() {
            await processGetDeviceOfCourse();
        }
        process();
    }
    useEffect(() => {
        getApiDevicesCourse()
    }, [props.fp.fpRow && props.fp.fpRow.item]);
    const hand_touch = (value) => {
        const hand_list = [];
        if (value <= 5) {
            for (let i = 1; i <= value; i++) {
                hand_list.push(<CButton key={i} className={`hand-touch hand-touch-${i} position-absolute rounded-circle p-0`} onClick={() => deleteFingerprintCount(i)} disabled={disabled}></CButton>)
            }
            return hand_list;
        }
        if (5 < value <= 10) {
            for (let i = 6; i <= value; i++) {
                hand_list.push(<CButton key={i} className={`hand-touch hand-touch-${i} position-absolute rounded-circle p-0`} onClick={() => deleteFingerprintCount(i)} disabled={disabled}></CButton>)
            }
            return hand_list;
        }
    }
    const deleteFingerprintCount = (index) => {
        // console.log(index);
        const trainee_id = props.fp.fpRow && props.fp.fpRow.item.id
        async function deleteFingerprint() {
            try {
                const result = await deleteFingerprintsTrainees(trainee_id, index);
                // console.log(result);
                if (result.data.success === true) {
                    props.fp.callToast(`Xóa thành công vân tay thứ ${index} của học viên ${props.fp.fpRow.item.ho_va_ten}!`)
                }
            } catch (error) {
                props.fp.callToast(`Xóa không thành công vân tay thứ ${index} của học viên ${props.fp.fpRow.item.ho_va_ten}!`)
            }
        }
        deleteFingerprint();
    }
    const changeButton = (change) => {
        if (change === true) {
            setDisabled(false)
            setName('Hủy')
        } else {
            setDisabled(true)
            setName('Xóa')
        }
    }
    return (
        <CModal
            show={props.fp.fpRow.on_off}
            onClose={closeModal}
            color=""
            closeOnBackdrop={false}
            className="modal-w1000"
        >
            <CModalHeader closeButton>
                <CModalTitle>Đăng ký vân tay</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol xs="12" md="2">
                        <CImg
                            src={props.fp.fpRow.item && props.fp.fpRow.item.anh_chan_dung}
                            alt={props.fp.fpRow.item && props.fp.fpRow.item.anh_chan_dung}
                            fluid
                            height={150}
                        />
                    </CCol>
                    <CCol>
                        <CRow>
                            <CCol>
                                <CFormGroup>
                                    <CLabel>Họ và tên</CLabel>
                                    <CInput
                                        placeholder="Họ và tên"
                                        defaultValue={props.fp.fpRow.item && props.fp.fpRow.item.ho_va_ten}
                                        disabled
                                    />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel>Ngày sinh</CLabel>
                                    <CInput type="date"
                                        placeholder="Ngày sinh"
                                        defaultValue={props.fp.fpRow.item && props.fp.fpRow.item.ngay_sinh}
                                        disabled
                                    />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel>Giới tính</CLabel>
                                    <CSelect custom
                                        value={props.fp.fpRow.item && props.fp.fpRow.item.gioi_tinh}
                                        disabled
                                    >
                                        <option value="M">Nam</option>
                                        <option value="F">Nữ</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="4">
                                <CFormGroup>
                                    <CLabel>CMND</CLabel>
                                    <CInput
                                        placeholder="CMND"
                                        defaultValue={props.fp.fpRow.item && props.fp.fpRow.item.so_cmt}
                                        disabled
                                    />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CCol>
                    <CCol xs="12" md="3">
                        <CRow>
                            <CCol xs="12">
                                <CRow>
                                    <CCol className="hand">
                                        <CImg
                                            src={hand}
                                            alt={hand}
                                            fluid
                                            className="img-fluid position-sticky mb-3"
                                        />
                                        {hand_touch(props.fp.fpRow.item && props.fp.fpRow.item.fingerprint_count)}
                                    </CCol>
                                    <CCol className="hand">
                                        <CImg
                                            src={hand}
                                            alt={hand}
                                            fluid
                                            className="img-fluid position-sticky mb-3"
                                            style={{ transform: 'scaleX(-1)' }}
                                        />
                                        {hand_touch(props.fp.fpRow.item && props.fp.fpRow.item.fingerprint_count)}
                                    </CCol>
                                </CRow>
                            </CCol>
                            {props.fp.fpRow.item && props.fp.fpRow.item.fingerprint_count === 0 ?
                                <span className="position-absolute w-100 h-100 d-flex align-items-end justify-content-center h2 pb-3" style={{ top: 0, left: 0, color: '#e55353' }}>không có vân tay</span> :
                                <CCol xs="12" className="d-flex justify-content-around">
                                    <CButton color="danger" onClick={() => props.delete.setDeleteRow(!props.delete.deleteRow)}>
                                        {props.fp.fpRow.loading ? <CSpinner className="mr-2" component="span" size="sm" aria-hidden="true" style={{ marginBottom: "0.1rem" }} /> : ""}
                                        Xóa tất cả
                                    </CButton>
                                    <CButton color="secondary" onClick={() => changeButton(disabled)}>
                                        {name}
                                    </CButton>
                                </CCol>
                            }
                        </CRow>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CDataTable
                            items={deviesInCourse}
                            fields={fields}
                            size="sm"
                            border
                            scopedSlots={{
                                stt: (item, index) => {
                                    return (
                                        <td>
                                            {/* {index + 1 + (page - 1) * 50} */}
                                            {index + 1}
                                        </td>
                                    );
                                },
                                name: (item, index) => {
                                    return (
                                        <td>
                                            {item.device.name}
                                        </td>
                                    );
                                },
                                manufacture: (item) => {
                                    return (
                                        <td>
                                            {item.device.manufacture}
                                        </td>
                                    )
                                },
                                serial: (item, index) => {
                                    return (
                                        <td>
                                            {item.device.serial_no}
                                        </td>
                                    );
                                },
                                status: (item, index) => {
                                    return (
                                        <td>
                                            {item.device.status}
                                        </td>
                                    );
                                },
                                checkbox_row: (item, index) => {
                                    return (
                                        <td className="text-center">
                                            <span role="button">
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                    <CInputCheckbox
                                                        type="checkbox"
                                                        id={index}
                                                        name={item.device.name}
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
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={closeModal}>
                    Đóng
                </CButton>
            </CModalFooter>
        </CModal >
    )
}

export default ModalFP