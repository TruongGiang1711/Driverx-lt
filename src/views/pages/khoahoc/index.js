import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './Khoahoc.scss';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDataTable,
    CNavLink,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import Moment from 'react-moment';
import { listStatus, getDataFake } from "./KhoahocData";
import KhoahocModal, { ModalAddRow, ModalDeleteRow, ModalData_synchronizingRow } from "./Modal";
import { ToastStatus } from "./Toasts/KhoahocToast";
import { Modal, Pagination, Select } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';

import { getCourses, getBranches, getHangs, updateCourse, addCourse, deleteCourse, getDevices, getDevicesCourse } from "src/services/userService";
import { getStatus, getColor, getColorCard_status, getCard_status, getData_synchronizing_status } from "../../component/getBadge/GetBadge";
import KhoahocTable from "./Table/KhoahocTable";
import KhoahocFilter from "./Filter/KhoahocFilter";
const { Option } = Select;

const Index = () => {
    const [courses, setCourses] = useState([]);
    const [branches, setBranches] = useState([]);
    const [hangs, setHangs] = useState([]);
    const [devices, setDevices] = useState([]);
    const [devicesCourse, setDevicesCourse] = useState([]);
    const [statusColor, setStatusColor] = useState(0);
    const [page, setPage] = useState(1);
    const [addRow, setAddRow] = useState({
        branch_id: 0,
        file: undefined,
        nameFile: '',
        on_off: false,
        disable: true,
        loading: false,
        hasData: '',
    });
    const [deleteRow, setDeleteRow] = useState({
        item: undefined,
        on_off: false,
        disable: true,
        loading: false,
        delData: false,
    });
    const [syncRow, setSyncRow] = useState({
        item: undefined,
        on_off: false,
    });
    const [toasts, setToasts] = useState([
        {
            position: 'top-right',
            autohide: 3000,
            show: false,
            item: undefined,
            value: 0,
            error: '',
            statusColor: statusColor
        }
    ])
    const toasters = (() => {
        return toasts.reduce((toasters, toast) => {
            toasters[toast.position] = toasters[toast.position] || []
            toasters[toast.position].push(toast)
            return toasters
        }, {})
    })()
    const [totalpages, setTotalpages] = useState(1);
    const [filter, setFilter] = useState({
        province_id: 0,
        customer_id: 0,
        branch_id: 0,
        name: '',
        hang: '',
        status: -1,
        page: 1
    })

    useEffect(() => {
        async function fetchCourses() {
            try {
                const courses = await getCourses(filter);
                // console.log(courses);
                setCourses(courses.data.items);
                setTotalpages(courses.data.total)
            } catch (error) {
            }
        }
        fetchCourses();
    }, [filter, statusColor]);
    useEffect(() => {
        async function fetchBranches() {
            const ob = {
                name: '',
                customer_id: 0,
                province_id: 0
            }
            try {
                const branches = await getBranches(ob);
                setBranches(branches.data);
            } catch (error) {
            }
        }
        fetchBranches();
        async function fetchHangs() {
            try {
                const hangs = await getHangs();
                setHangs(hangs.data);
            } catch (error) {
            }
        }
        fetchHangs();
    }, []);
    const changePage = (page) => {
        setPage(page)
        async function fetchCourses() {
            const ob = {
                ...filter,
                page: page
            }
            try {
                const courses = await getCourses(ob);
                setCourses(courses.data.items);
            } catch (error) {
            }
        }
        fetchCourses()
    }
    const onDeleteRow = (id) => {
        setDeleteRow({ ...deleteRow, disable: true, loading: true })
        async function deleteCourseID() {
            try {
                const del = await deleteCourse(id);
                if (del.data.success === true) {
                    setDeleteRow({ ...deleteRow, delData: del.data.success, on_off: false, disable: true, loading: false })
                    async function fetchCourses() {
                        try {
                            const courses = await getCourses(filter);
                            // console.log(courses);
                            setCourses(courses.data.items);
                            setTotalpages(courses.data.total)
                        } catch (error) {
                        }
                    }
                    fetchCourses();
                }
            } catch (error) {
                setToasts([
                    ...toasts,
                    {
                        position: 'top-right',
                        autohide: true && 5000,
                        closeButton: true,
                        fade: true,
                        show: true,
                        item: undefined,
                        value: 0,
                        error: error.message,
                        statusColor: -1,
                    }
                ])
            }
        }
        deleteCourseID()
    }
    const onAddFileXML = () => {
        setAddRow({ ...addRow, disable: true, loading: true })
        async function addCourseXML() {
            const formData = new FormData();
            formData.append("file", addRow.file[0]);
            formData.append("branch_id", addRow.branch_id);
            try {
                const add = await addCourse(formData);
                if (add.statusText === "OK") {
                    setAddRow({ ...addRow, hasData: add.statusText, nameFile: undefined, on_off: false, disable: true, loading: false })
                    async function fetchCourses() {
                        try {
                            const courses = await getCourses(filter);
                            // console.log(courses);
                            setCourses(courses.data.items);
                            setTotalpages(courses.data.total)
                        } catch (error) {
                        }
                    }
                    fetchCourses();
                }
            } catch (error) {
            }
        }
        addCourseXML()
    }
    const getDataCourseDevices = async (item) => {
        setSyncRow({ item: item, on_off: true })
        async function fetchDevices() {
            const ob = {
                name: '',
                serial: '',
                working_status: -1,
                sync_status: -1,
                province_id: 0,
                customer_id: 0,
                branch_id: item.branch_id,
                page: 1,
            }
            try {
                const devices = await getDevices(ob);
                const arr = []
                devices.data.items.map(item => {
                    arr.push({
                        id: item.id,
                        name: item.name,
                        checked: false,
                    })
                })
                setDevices(arr)
            } catch (error) {
            }
        }
        await fetchDevices();

        async function fetchDevicesCourse() {
            try {
                const devicesCourse = await getDevicesCourse(item.id);
                const arr = []
                devicesCourse.data.map(item => {
                    arr.push({
                        id: item.device.id,
                        name: item.device.name,
                        checked: false,
                    })
                })
                setDevicesCourse(arr)
                // setDevicesCourse([...devicesCourse,
                // {
                //   id: devicesCourse.data.device.id,
                //   name: devicesCourse.data.device.name,
                // }])
            } catch (error) {
            }
        }
        await fetchDevicesCourse();
    }
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
    return (
        <>
            <CRow>
                <CCol>
                    <CCard className="courses-card">
                        <CCardHeader><h4 className="mb-0">Danh sách khóa học</h4></CCardHeader>
                        <CCardBody>
                            <KhoahocFilter
                                filter={{ filter, setFilter }}
                                addRow={{ addRow, setAddRow }}
                                branches={branches} hangs={hangs}
                            />
                            <KhoahocTable
                                courses={courses}
                                filter={{ filter, setFilter }}
                                statusColor={{ statusColor, setStatusColor }}
                                toasts={{ toasts, setToasts }}
                                syncRow={{ syncRow, setSyncRow }}
                                devices={{ devices, setDevices }}
                                devicesCourse={{ devicesCourse, setDevicesCourse }}
                                deleteRow={{ deleteRow, setDeleteRow }}
                                page={{ page, setPage }}
                                getDataCourseDevices={getDataCourseDevices}
                            />
                        </CCardBody>
                        <Pagination className="core-pagination text-center pb-4" total={totalpages} pageSize={50} showSizeChanger={false} current={page} onChange={(page) => changePage(page)} />
                    </CCard>
                </CCol>
            </CRow>
            <KhoahocModal
                add={{ addRow, setAddRow, onAddFileXML }}
                delete={{ deleteRow, setDeleteRow, onDeleteRow }}
                sync={{ syncRow, setSyncRow, devices, devicesCourse, setDevicesCourse, changeSyncRow }}
            />
            {/* {ModalAddRow({ addRow, setAddRow, onAddFileXML })}
            {ModalDeleteRow({ deleteRow, setDeleteRow, onDeleteRow })}
            {ModalData_synchronizingRow({ syncRow, setSyncRow, devices, devicesCourse, changeSyncRow })} */}
            {ToastStatus(toasters)}
        </>
    );
};

export default Index;
