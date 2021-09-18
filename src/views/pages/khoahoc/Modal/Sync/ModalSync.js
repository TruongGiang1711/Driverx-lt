import React, { forwardRef, useEffect, useRef, useState } from 'react'
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
    CSpinner,
    CInputFile,
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const ModalData_synchronizing = (props) => {
    console.log(props);
    const fields = [{
        key: "stt",
        label: "STT",
    }, {
        key: "name",
        label: "Tên máy",
    }, {
        key: "model",
        label: "Model",
    },
    {
        key: "checkbox_row",
        label: "",
    },
    ]
    const [showCard, setShowCard] = useState(true)
    const [checkedList, setCheckedList] = useState([])
    const [checkBox, setCheckBox] = useState({
        item: undefined,
        checked: false,
    })
    const [checkBoxArr, setCheckBoxArr] = useState([])
    const closeModal = () => {
        props.sync.props.sync.setSyncRow({ ...props.sync.props.sync.syncRow, on_off: !props.sync.props.sync.syncRow.on_off })
    }
    const searchMay = (value) => {
        // console.log(value.target.value);
    }
    const changeCheck = (item, value) => {
        console.log(item);
        console.log(value.target.checked);
        const a = props.sync.props.sync.devicesCourse.find(d => d.id === item.id)
        // console.log(evt.target.checked);
        // const a = [...checkedList]
        // a[evt.target.id] = evt.target.checked
        // setCheckedList(a)
        // if (checkBox !== evt.target.checked) {
        //     setCheckBox({
        //         item: item,
        //         checkBox: evt.target.checked
        //     });
        //     props.devicesCourse.push(checkBox)
        // }
    }
    useEffect(() => {
        props.sync.props.sync.devices.map(item => {
            console.log(props.sync.props.sync.devicesCourse.find(d => d.id === item.id));
                // props.sync.props.sync.setDevicesCourse({ ...props.sync.props.sync.devicesCourse, checked: true })
        })
    }, [props.sync.props.sync.devicesCourse])
    // function doSomething() {
    //     const result = ["may 1", "may 2"]; // tu backen
    //     const listCu = [...result]; //["may 1","may 2"]
    //     //object destructoring
    //     result[0] = 4;
    //     //result = ["may 1","may fk"]
    //     //listCu = []
    //     listCu.map((e) => {
    //         //neu e ko co trong result thi xoa
    //         //lan for 1
    //         //e = may 1, may 1 co trong list moi bo qua
    //         //lan for 2
    //         //e = may 2, may 2 ko con trong list moi=> goi api xoa may 2
    //         //console.log(xoa may 2)
    //     });
    //     result.map((m) => {
    //         //neu m ko co trong list cu thi them moi
    //         //lan for 1
    //         //m = may 1, may 1 co trong list cu bo qua
    //         //lan for 2
    //         //m = may fk, ko co trong list cu => goi api them moi
    //         //console.log(add may fk)
    //     });
    //     //goi api get lai list
    // }
    // useEffect(() => {
    //     const arr = new Array(props.sync.devices.length).fill(false);
    //     console.log(checkedList);
    //     props.sync.devicesCourse.map(item => {
    //         const index = props.sync.devices.findIndex(d => d.id === item.id)
    //         if (index > -1) {
    //             arr[index] = true
    //         }
    //     })
    //     console.log(arr, "-----------------------");
    //     setCheckedList(arr)
    // }, [props.devicesCourse])
    // const getChecked = (index) => {
    //     console.log(index);
    //     console.log(checkedList, "checkList");
    //     const a = checkedList[index]
    //     console.log(a, "resul =================================");
    //     return a
    // }
    return (
        <CModal
            show={props.sync.props.sync.syncRow.on_off}
            onClose={closeModal}
            size="lg"
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
                                        <CInput placeholder="Khóa" defaultValue={props.sync.props.sync.syncRow.item && props.sync.props.sync.syncRow.item.ten_khoa_hoc} onChange={(value) => props.sync.props.sync.changeSyncRow(value)} />
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="3">
                                <CFormGroup row>
                                    <CLabel>Hạng</CLabel>
                                    <CCol>
                                        <CInput placeholder="Hạng" defaultValue={props.sync.props.sync.syncRow.item && props.sync.props.sync.syncRow.item.hang_gplx} onChange={(value) => props.sync.props.sync.changeSyncRow(value)} />
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="3">
                                <CFormGroup row>
                                    <CLabel>Sĩ số</CLabel>
                                    <CCol>
                                        <CInput placeholder="Sĩ số" defaultValue={props.sync.props.sync.syncRow.item && props.sync.props.sync.syncRow.item.so_hoc_sinh} onChange={(value) => props.sync.props.sync.changeSyncRow(value)} />
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CFormGroup row>
                                    <CLabel>Phân hiệu</CLabel>
                                    <CCol>
                                        <CInput placeholder="Phân hiệu" defaultValue={props.sync.props.sync.syncRow.item && props.sync.props.sync.syncRow.item.branch_name} onChange={(value) => props.sync.props.sync.changeSyncRow(value)} />
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
                                <CInput placeholder="Tìm máy..." onSelect={searchMay} />
                            </CCol>
                        </CFormGroup>
                    </CCardBody>
                </CCard>
                <CRow>
                    <CCol xs="12" lg="8">
                        <CDataTable
                            items={props.sync.props.sync.devices}
                            fields={fields}
                            size="sm"
                            border
                            // tableFilter
                            scopedSlots={{
                                stt: (item, index) => {
                                    return (
                                        <td>
                                            {/* {index + 1 + (page - 1) * 50} */}
                                            {index + 1}
                                        </td>
                                    )
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
                                        <td className="text-center">
                                            <span role="button">
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                    <CInputCheckbox
                                                        type="checkbox"
                                                        id={index}
                                                        name={item.name}
                                                        onChange={(value) => changeCheck(item, value)}
                                                        defaultChecked={item.checked}
                                                    />{item.id}
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
                            <CCardHeader color="secondary">
                                Gán 3/3 máy
                            </CCardHeader>
                            <CListGroup className="list-group-sm">
                                {props.sync.props.sync.devicesCourse.map(item => {
                                    return <CFade in={showCard} key={item.id}>
                                        <CListGroupItem className="justify-content-between">
                                            {item.name} - {item.id}
                                            <CLink className="card-header-action float-right" onClick={() => setShowCard(false)}>
                                                <CIcon name="cil-x-circle" />
                                            </CLink>
                                        </CListGroupItem>
                                    </CFade>
                                })}
                            </CListGroup>
                        </CCard>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary">
                    Do Something
                </CButton>{' '}
                <CButton color="secondary" onClick={closeModal}>
                    Cancel
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalData_synchronizing;