import React, { useEffect, useState } from "react";
import './Hocvien.scss';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import HocvienFilter from "./Filter/HocvienFilter";
import HocvienTable from "./Table/HocvienTable";
import ModalAdd from "./Modal/Add/ModalAdd";
import ModalDelete from "./Modal/Delete/ModalDelete";
import ModalEdit from "./Modal/Edit/ModalEdit";
import ModalInfoLearn from "./Modal/InfoLearn/ModalInfoLearn";
import { useLocation } from "react-router-dom";
import { Pagination } from 'antd';
import { getTrainees } from "src/services/traineesService";
import { getBranches } from "src/services/branchsService";
import { getCoursesID } from "src/services/coursesService";
import ModalFP from "./Modal/FP/ModalFP";
import HocvienToast from "./Toasts/HocvienToast";

const Index = () => {
  const queryPage = useLocation().search.match(/course_id=([0-9]+)/, '')
  const courseID = Number(queryPage && queryPage[1] ? queryPage[1] : 0)
  const [trainees, setTrainees] = useState([]);
  const [branches, setBranches] = useState([]);
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
  const [fpRow, setFPRow] = useState({
    item: undefined,
    on_off: false,
    disable: false,
    loading: false,
  });
  const [infoLearnRow, setInfoLearnRow] = useState({
    item: undefined,
    on_off: false,
    active: ''
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
        statusColor: status ? status : -1,
      }
    ])
  }
  const [filter, setFilter] = useState({
    name: '',
    id_card: '',
    rf_card: '',
    rf_card_name: '',
    course_id: 0,
    province_id: 0,
    customer_id: 0,
    branch_id: 0,
    page: 1,
    status: -1,
  })
  const changePage = (page) => {
    setPage(page)
    async function fetchTrainees() {
      const ob = {
        ...filter,
        page: page
      }
      try {
        const trainees = await getTrainees(ob);
        setTrainees(trainees.data.items);
        setTotalpages(trainees.data.total)
      } catch (error) {
      }
    }
    fetchTrainees()
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
      } catch (error) {
      }
    }
    fetchBranches();
    async function fetchCoursesID() {
      try {
        if (courseID === 0) {
          return
        }
        const response = await getCoursesID(courseID);
        setFilter({
          ...filter,
          course_id: response.data.id,
          branch_id: response.data.branch.id,
          status: response.data.status,
        })
      } catch (error) {
      }
    }
    fetchCoursesID()
  }, []);
  return (
    <>
      <CRow>
        <CCol>
          <CCard className="trainess-card">
            <CCardHeader><h4 className="mb-0">Danh sách học viên</h4></CCardHeader>
            <CCardBody>
              <HocvienFilter
                filter={{ filter, setFilter }}
                addRow={{ addRow, setAddRow }}
                trainees={{ trainees, setTrainees }}
                totalpages={{ totalpages, setTotalpages }}
                page={{ page, setPage }}
                courseID={courseID}
                branches={branches}
              />
              <HocvienTable
                trainees={trainees}
                filter={{ filter, setFilter }}
                deleteRow={{ deleteRow, setDeleteRow }}
                editRow={{ editRow, setEditRow }}
                fpRow={{ fpRow, setFPRow }}
                info={{ infoLearnRow, setInfoLearnRow }}
                page={{ page, setPage }}
                statusColor={{ statusColor, setStatusColor }}
                toasts={{ callToast }}
              />
            </CCardBody>
            <Pagination className="core-pagination text-center pb-4" total={totalpages} pageSize={50} showSizeChanger={false} current={page} onChange={(page) => changePage(page)} />
          </CCard>
        </CCol>
      </CRow>
      <ModalAdd
        add={{ addRow, setAddRow, filter, setTrainees, setTotalpages, callToast }}
      />
      <ModalDelete
        delete={{ deleteRow, setDeleteRow, filter, setTrainees, setTotalpages, callToast }}
      />
      <ModalEdit
        edit={{ editRow, setEditRow, filter, setTrainees, setTotalpages, callToast }}
      />
      <ModalFP
        fp={{ fpRow, setFPRow, filter, setTrainees, setTotalpages, callToast }}
      />
      <ModalInfoLearn
        info={{ infoLearnRow, setInfoLearnRow }}
      />
      {HocvienToast(toasters)}
    </>
  );
};

export default Index;
