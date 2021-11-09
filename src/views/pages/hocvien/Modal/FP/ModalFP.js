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
} from '@coreui/react'
import TableFP from './Table/TableFP';
import hand from './../../../../../assets/hand.png';
import { getDevicesCourse } from 'src/services/coursesService';
import { deleteFingerprintsTrainees, getFingerprint } from 'src/services/traineesService';
import { listFinger, listFingerLeft, listFingerRight } from '../../HocvienData';
import { addFingerprint } from 'src/services/devicesService';

const ModalFP = (props) => {
    // console.log(props);
    const [deviesInCourse, setDeviesInCourse] = useState([]); // danh sach thiet bi cua khoa hoc
    const [oldFingerprint, setOldFingerprint] = useState(listFinger());
    const [fingerprint, setFingerprint] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [name, setName] = useState('Xóa');
    const [trainee, setTrainee] = useState({});
    const closeModal = () => {
        props.fp.setFPRow({ ...props.fp.fpRow, on_off: false })
    }
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
    const getFingerprintTrainee = () => {
        async function getAllFingerprint() {
            try {
                const result = await getFingerprint(props.fp.fpRow.item.id);
                // console.log(result);
                setFingerprint(result.data)
            } catch (error) { }
        }
        getAllFingerprint();
    }
    const addFingerprintFromDevice = (tokenDevice, index) => {
        // console.log(index);
        async function add() {
            const trainee_id = props.fp.fpRow && props.fp.fpRow.item.id
            const ob = {
                command: "PROMPT_ENROLL",
                options: {
                    trainee_id: trainee_id,
                    device_id: tokenDevice,
                    finger_index: index
                }
            }
            try {
                const result = await addFingerprint(ob);
                // console.log(result);
                // if (result.data.success === true) {
                //     props.fp.callToast(``)
                // }
            } catch (error) {
                // props.fp.callToast(``)
            }
        }
        add();
    }
    const deleteFingerprintAPI = (index) => {
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
    const deleteFinger = (index) => {
        // xóa data fake fingerprint
        const newFingerprint = oldFingerprint.filter(ele => {
            return ele.id !== index
        })
        setOldFingerprint(newFingerprint)
    }
    const deleteFingerprintCount = (index) => {
        // console.log(index);
        if (!disabled) {
            deleteFinger(index)
        }
    }
    const deleteAllFingerprint = () => {
        var arrResult = [...oldFingerprint]
        oldFingerprint.map(item => {
            // TODO:call api
            // var result = result.data.success
            var result = true;
            if (result) {
                var newArr = arrResult.filter(ele => ele.id !== item.id)
                arrResult = newArr
            } else {
                // props.fp.callToast(`Xóa không thành công vân tay thứ ${index} của học viên ${props.fp.fpRow.item.ho_va_ten}!`)
            }
        })
        setOldFingerprint(arrResult)
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
    useEffect(() => {
        getApiDevicesCourse()
        getFingerprintTrainee()
        setTrainee(props.fp.fpRow && props.fp.fpRow.item)
    }, [props.fp.fpRow && props.fp.fpRow.item]);
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
                                        {listFingerLeft().map((item, index) => {
                                            return <CButton key={item.id}
                                                className={`position-absolute p-0 hand-touch hand-touch-${item.id}`}
                                                disabled={disabled}
                                            >{
                                                    fingerprint.some(e => (e.id === item.id)) ?
                                                        <div
                                                            className={`w-100 h-100 rounded-circle ${fingerprint.some(e => (e.id === item.id)) ? 'have' : 'have-not'}`}
                                                            onClick={() => deleteFingerprintCount(item.id)}></div> :
                                                        <div
                                                            className={`w-100 h-100 rounded-circle ${fingerprint.some(e => (e.id === item.id)) ? 'have' : 'have-not'}`}></div>
                                                }
                                            </CButton>
                                        })}
                                    </CCol>
                                    <CCol className="hand">
                                        <CImg
                                            src={hand}
                                            alt={hand}
                                            fluid
                                            className="img-fluid position-sticky mb-3"
                                            style={{ transform: 'scaleX(-1)' }}
                                        />
                                        {listFingerRight().map((item, index) => {
                                            return <CButton key={item.id}
                                                className={`position-absolute p-0 hand-touch hand-touch-${item.id}`}
                                                disabled={disabled}
                                            >{
                                                    oldFingerprint.some(e => (e.id === item.id)) ?
                                                        <div
                                                            className={`w-100 h-100 rounded-circle ${oldFingerprint.some(e => (e.id === item.id)) ? 'have' : 'have-not'}`}
                                                            onClick={() => deleteFingerprintCount(item.id)}></div> :
                                                        <div
                                                            className={`w-100 h-100 rounded-circle ${oldFingerprint.some(e => (e.id === item.id)) ? 'have' : 'have-not'}`}></div>
                                                }</CButton>
                                        })}
                                    </CCol>
                                </CRow>
                            </CCol>
                            {props.fp.fpRow.item && props.fp.fpRow.item.fingerprint_count !== 0 ?
                                <span className="position-absolute w-100 h-100 d-flex align-items-end justify-content-center h2 pb-3" style={{ top: 0, left: 0, color: '#e55353' }}>không có vân tay</span> :
                                <CCol xs="12" className="d-flex justify-content-around">
                                    <CButton color="danger" onClick={deleteAllFingerprint}>
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
                        <TableFP
                            deviesInCourse={deviesInCourse}
                            item={trainee}
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