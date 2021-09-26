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

  useEffect(() => {
    async function fetchCards() {
      try {
        const rfcards = await getRfcards(filter);
        console.log(rfcards);
        setRfcards(rfcards.data.items);
        setTotalpages(rfcards.data.total)
      } catch (error) {
      }
    }
    fetchCards();
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
                branches={branches}
                filter={{ filter, setFilter }}
                addRow={{ addRow, setAddRow }}
                totalpages={{ totalpages, setTotalpages }}
                page={{ page, setPage }}
              />
              <TheTable
                rfcards={rfcards}
                filter={{ filter, setFilter }}
                statusColor={{ statusColor, setStatusColor }}
                toasts={{ toasts, setToasts }}
                deleteRow={{ deleteRow, setDeleteRow }}
                editRow={{ editRow, setEditRow }}
                page={{ page, setPage }}
              />
            </CCardBody>
            <Pagination className="core-pagination text-center pb-4" total={totalpages} pageSize={50} showSizeChanger={false} current={page} onChange={(page) => changePage(page)} />
          </CCard>
        </CCol>
      </CRow>
      <ModalAdd
        add={{ addRow, setAddRow, filter, setRfcards, setTotalpages, toasts, setToasts }}
      />
      <ModalDelete
        delete={{ deleteRow, setDeleteRow, filter, setTotalpages, toasts, setToasts }}
      />
      <ModalEdit
        edit={{ editRow, setEditRow, filter, setTotalpages, toasts, setToasts }}
      />
      {/* {ModalAddRow({ addRow, setAddRow, })}
      {ModalDeleteRow({ deleteRow, setDeleteRow, })}
      {ModalData_synchronizingRow({ syncRow, setSyncRow, })}
      <CToaster
        position={toasts.position}
      >
        <CToast
          key={'toast'}
          show={toasts.show}
          autohide={true && 3000}
        >
          <CToastHeader>
            Toast title
          </CToastHeader>
          <CToastBody>
            {`This is a toast in positioned toaster number.`}
          </CToastBody>
        </CToast>
      </CToaster> */}
    </>
  );
};

export default Index;
