import React, { useEffect, useState } from "react";
import './Khoahoc.scss';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from "@coreui/react";
import { ToastStatus } from "./Toasts/KhoahocToast";
import { Pagination } from 'antd';
import KhoahocTable from "./Table/KhoahocTable";
import KhoahocFilter from "./Filter/KhoahocFilter";
import ModalAdd from "./Modal/Add/ModalAdd";
import ModalDelete from "./Modal/Delete/ModalDelete";
import ModalSync from "./Modal/Sync/ModalSync";
import { getCourses } from "src/services/courseService";
import { getBranches } from "src/services/branchService";
import { getHangs } from "src/services/hangService";

const Index = () => {
    const [courses, setCourses] = useState([]);
    const [branches, setBranches] = useState([]);
    const [hangs, setHangs] = useState([]);
    const [devices, setDevices] = useState([]);
    const [devicesCourse, setDevicesCourse] = useState([]);
    const [statusColor, setStatusColor] = useState(0);
    const [totalpages, setTotalpages] = useState(1);
    const [page, setPage] = useState(1);
    const [addRow, setAddRow] = useState({
        branch_id: 0,
        file: undefined,
        nameFile: '',
        on_off: false,
        disable: false,
        loading: false,
        hasData: '',
    });
    const [deleteRow, setDeleteRow] = useState({
        item: undefined,
        on_off: false,
        disable: false,
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
    const getDataCourseDevices = async (item) => {
        setSyncRow({ item: item, on_off: true })
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
            <ModalAdd
                add={{ addRow, setAddRow, filter, setCourses, setTotalpages , toasts, setToasts }}
            />
            <ModalDelete
                delete={{ deleteRow, setDeleteRow, filter, setCourses, setTotalpages, toasts, setToasts }}
            />
            <ModalSync
                sync={{ syncRow, setSyncRow, devices, devicesCourse, setDevicesCourse, toasts, setToasts }}
            />
            {/* <KhoahocModal
                delete={{ deleteRow, setDeleteRow, onDeleteRow }}
                sync={{ syncRow, setSyncRow, devices, devicesCourse, setDevicesCourse, changeSyncRow }}
            /> */}
            {/* {ModalAddRow({ addRow, setAddRow, onAddFileXML })}
            {ModalDeleteRow({ deleteRow, setDeleteRow, onDeleteRow })}
            {ModalData_synchronizingRow({ syncRow, setSyncRow, devices, devicesCourse, changeSyncRow })} */}
            {ToastStatus(toasters)}
        </>
    );
};

export default Index;
