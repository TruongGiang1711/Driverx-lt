import React, { useEffect, useState } from "react";
import './Maydiemdanh.scss';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from "@coreui/react";
import MaydiemdanhToast from "./Toasts/MaydiemdanhToast";
import MaydiemdanhTable from "./Table/MaydiemdanhTable";
import MaydiemdanhFilter from "./Filter/MaydiemdanhFilter";
import ModalAdd from "./Modal/Add/ModalAdd";
import ModalDelete from "./Modal/Delete/ModalDelete";
import ModalEdit from "./Modal/Edit/ModalEdit";
import { Pagination } from 'antd';
import { getBranches } from "src/services/branchsService";
import { getAttendanceDevices } from "src/services/attendanceService";

const Index = () => {
    const [attendanceDevices, setAttendanceDevices] = useState([]);
    const [branches, setBranches] = useState([]);
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
    const [editRow, setEditRow] = useState({
        item: undefined,
        on_off: false,
        disable: false,
        loading: false,
    });
    const [toasts, setToasts] = useState([
        {
            position: 'top-right',
            autohide: 3000,
            show: false,
            item: undefined,
            value: 0,
            error: '',
            statusColor: 0
        }
    ])
    const toasters = (() => {
        return toasts.reduce((toasters, toast) => {
            toasters[toast.position] = toasters[toast.position] || []
            toasters[toast.position].push(toast)
            return toasters
        }, {})
    })()
    const callToast = (mess, status) => {
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
                error: mess,
                statusColor: status,
            }
        ])
    }
    const [filter, setFilter] = useState({
        name: '',
        serial: '',
        working_status: -1,
        sync_status: -1,
        province_id: 0,
        customer_id: 0,
        branch_id: 0,
        page: 1,
    })

    useEffect(() => {
        async function fetchAttendanceDevices() {
            try {
                const attendanceDevices = await getAttendanceDevices(filter);
                setAttendanceDevices(attendanceDevices.data.items.sort(function (a, b) {
                    return a.id - b.id;
                }));
                setTotalpages(attendanceDevices.data.total)
            } catch (error) {
            }
        }
        fetchAttendanceDevices();
        setPage(1)
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
    }, []);
    const changePage = (page) => {
        setPage(page)
        async function fetchAttendanceDevices() {
            const ob = {
                ...filter,
                page: page
            }
            try {
                const attendanceDevices = await getAttendanceDevices(ob);
                setAttendanceDevices(attendanceDevices.data.items);
            } catch (error) {
            }
        }
        fetchAttendanceDevices()
    }
    return (
        <>
            <CRow>
                <CCol>
                    <CCard className="attendanceDevices-card">
                        <CCardHeader><h4 className="mb-0">Danh sách máy điểm danh</h4></CCardHeader>
                        <CCardBody>
                            <MaydiemdanhFilter
                                filter={{ filter, setFilter }}
                                addRow={{ addRow, setAddRow }}
                                branches={branches}
                            />
                            <MaydiemdanhTable
                                attendanceDevices={attendanceDevices}
                                filter={{ filter, setFilter }}
                                toasts={{ callToast }}
                                deleteRow={{ deleteRow, setDeleteRow }}
                                page={{ page, setPage }}
                                editRow={{ editRow, setEditRow }}
                            />
                        </CCardBody>
                        <Pagination className="core-pagination text-center pb-4" total={totalpages} pageSize={50} showSizeChanger={false} current={page} onChange={(page) => changePage(page)} />
                    </CCard>
                </CCol>
            </CRow>
            <ModalAdd
                add={{ addRow, setAddRow, filter, setAttendanceDevices, setTotalpages, callToast, branches }}
            />
            <ModalEdit
                edit={{ editRow, setEditRow, filter, setAttendanceDevices, setTotalpages, callToast, branches }}
            />
            <ModalDelete
                delete={{ deleteRow, setDeleteRow, filter, attendanceDevices, setAttendanceDevices, setTotalpages, callToast }}
            />
            {MaydiemdanhToast(toasters)}
        </>
    );
};

export default Index;
