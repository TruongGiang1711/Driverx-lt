import React, { useEffect, useState } from "react";
import './The.scss';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import TheFilter from "./Filter/TheFilter";
import TheTable from "./Table/TheTable";
import { Pagination } from 'antd';
import { getBranches } from "src/services/branchsService";
import { getRfcards } from "src/services/rfcardsService";
import ModalDelete from "./Modal/Delete/ModalDelete";
import ModalEdit from "./Modal/Edit/ModalEdit";
import ModalAdd from "./Modal/Add/ModalAdd";
import TheToast from "./Toasts/TheToast";

const Index = () => {
  const [branches, setBranches] = useState([]);
  const [rfcards, setRfcards] = useState([]);
  const [totalpages, setTotalpages] = useState(1);
  const [page, setPage] = useState(1);
  const [statusColor, setStatusColor] = useState(0);
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
  const [filter, setFilter] = useState({
    card_name: '',
    card_num: '',
    status: -2,
    province_id: 0,
    customer_id: 0,
    branch_id: 0,
    page: 1,
  })
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
        setFilter({ ...filter, branch_id: branches.data[0].id })
      } catch (error) {
      }
    }
    fetchBranches();
  }, []);
  useEffect(() => {
    if (branches.length > 0) {
      async function fetchCards() {
        try {
          const rfcards = await getRfcards(filter);
          // console.log(rfcards);
          setRfcards(rfcards.data.items);
          setTotalpages(rfcards.data.total)
        } catch (error) {
        }
      }
      fetchCards();
      setPage(1)
    }
  }, [filter]);
  const changePage = (page) => {
    setPage(page)
    async function fetchCards() {
      const ob = {
        ...filter,
        page: page
      }
      try {
        const rfcards = await getRfcards(ob);
        setRfcards(rfcards.data.items);
      } catch (error) {
      }
    }
    fetchCards()
  }
  return (
    <>
      <CRow>
        <CCol>
          <CCard className="rfcards-card">
            <CCardHeader><h4 className="mb-0">Danh sách thẻ</h4></CCardHeader>
            <CCardBody>
              <TheFilter
                filter={{ filter, setFilter }}
                addRow={{ addRow, setAddRow }}
                branches={branches}
              />
              <TheTable
                rfcards={rfcards}
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
        add={{ addRow, setAddRow, filter, setRfcards, setTotalpages, callToast }}
      />
      <ModalEdit
        edit={{ editRow, setEditRow, filter, setRfcards, setTotalpages, callToast }}
      />
      <ModalDelete
        delete={{ deleteRow, setDeleteRow, filter, rfcards, setRfcards, setTotalpages, callToast }}
      />
      {TheToast(toasters)}
    </>
  );
};

export default Index;
