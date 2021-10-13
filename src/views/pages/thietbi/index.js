import React, { useEffect, useState } from "react";
import './Thietbi.scss';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from "@coreui/react";
import ThietbiToast from "./Toasts/ThietbiToast";
import ThietbiTable from "./Table/ThietbiTable";
import ModalAdd from "./Modal/Add/ModalAdd";
import ModalDelete from "./Modal/Delete/ModalDelete";
import { Pagination } from 'antd';
import ThietbiFilter from "./Filter/ThietbiFilter";
import { getTrackingDevices } from "src/services/devicesService";
import { getBranches } from "src/services/branchsService";

const Index = () => {
    const [trackingDevices, setTrackingDevices] = useState([]);
    const [branches, setBranches] = useState([]);
    const [totalpages, setTotalpages] = useState(1);
    const [page, setPage] = useState(1);
    const [addRow, setAddRow] = useState({
        branch_id: 0,
        on_off: false,
        disable: false,
        loading: false,
    });
    const [deleteRow, setDeleteRow] = useState({
        item: undefined,
        on_off: false,
        disable: false,
        loading: false,
        delData: false,
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
        page: 1
    })

    useEffect(() => {
        async function fetchTrackingDevices() {
            try {
                const trackingDevices = await getTrackingDevices(filter);
                setTrackingDevices(trackingDevices.data.items.sort(function (a, b) {
                    return a.id - b.id;
                }));
                setTotalpages(trackingDevices.data.total)
            } catch (error) {
            }
        }
        fetchTrackingDevices();
        setPage(1)
    }, [filter]);
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
        async function fetchTrackingDevices() {
            const ob = {
                ...filter,
                page: page
            }
            try {
                const trackingDevices = await getTrackingDevices(ob);
                setTrackingDevices(trackingDevices.data.items);
            } catch (error) {
            }
        }
        fetchTrackingDevices()
    }
    return (
        <>
            <CRow>
                <CCol>
                    <CCard className="tracking-devices-card">
                        <CCardHeader><h4 className="mb-0">Danh sách khóa học</h4></CCardHeader>
                        <CCardBody>
                            <ThietbiFilter
                                filter={{ filter, setFilter }}
                                branches={branches}
                                addRow={{ addRow, setAddRow }}
                            />
                            <ThietbiTable
                                trackingDevices={trackingDevices}
                                filter={{ filter, setFilter }}
                                toasts={{ callToast }}
                                deleteRow={{ deleteRow, setDeleteRow }}
                                page={{ page, setPage }}
                            />
                        </CCardBody>
                        <Pagination className="core-pagination text-center pb-4" total={totalpages} pageSize={50} showSizeChanger={false} current={page} onChange={(page) => changePage(page)} />
                    </CCard>
                </CCol>
            </CRow>
            <ModalAdd
                add={{ addRow, setAddRow, filter, setTrackingDevices, setTotalpages, callToast }}
            />
            <ModalDelete
                delete={{ deleteRow, setDeleteRow, filter, trackingDevices, setTrackingDevices, setTotalpages, callToast }}
            />
            {ThietbiToast(toasters)}
        </>
    );
};

export default Index;
