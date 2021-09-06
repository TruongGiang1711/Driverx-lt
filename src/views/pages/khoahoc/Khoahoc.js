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
import { usersDataFake } from "./KhoahocData";
import { ModalAddRow, ModalDeleteRow, ModalData_synchronizingRow } from "./KhoahocModal";
import { FilterKhoahoc } from "./KhoahocFilter";

import { getCourses, getBranches, getHangs } from "src/services/userService";
import { getColor, getStatus, getColorCard_status, getCard_status, getData_synchronizing_status } from "./../../component/getBadge/GetBadge";

// console.log(usersDataFake.find((itemFake) => itemFake.stt === 3).data_synchronizing)
const Dashboard = () => {
  const history = useHistory()
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [hangs, setHangs] = useState([]);
  const [addRow, setAddRow] = useState(false)
  const [deleteRow, setDeleteRow] = useState(false)
  const [syncRow, setSyncRow] = useState(false)
  const [filterSearch, setFilterSearch] = useState('')
  const [filter, setFilter] = useState({
    province_id: 0,
    customer_id: 0,
    branch_id: 0,
    name: '',
    hang: '',
    status: -1,
    page: 1
  })
  const fields = [
    { key: "stt", label: "STT", },
    { key: "ten_khoa_hoc", label: "TÊN KHÓA", },
    { key: "branch_id", label: "PHÂN HIỆU", _classes: filter.branch_id === 0 ? "d-table-cell" : "d-none" },
    { key: "hang_gplx", label: "HẠNG", },
    { key: "ngay_khai_giang", label: "KHAI GIẢNG", },
    { key: "status", label: "TRẠNG THÁI", },
    { key: "card_status", label: "GÁN THẺ", },
    { key: "biometrics", label: "SINH TRẮC", },
    { key: "so_hoc_sinh", label: "SĨ SỐ", },
    { key: "data_synchronizing", label: "ĐỒNG BỘ DỮ LIỆU", },
    // { key: "theory", label: "LÝ THUYẾT", },
    // { key: "practise", label: "THỰC HÀNH" },
    { key: "ngay_be_giang", label: "BẾ GIẢNG" },
    {
      key: "delete_row",
      label: "",
      sorter: false,
      filter: false,
    },
  ];
  const redirectUser = (item) => {
    history.push(`/hocvien`)
  }

  useEffect(() => {
    // console.log(filter)
    async function fetchCourses() {
      try {
        const courses = await getCourses(filter);
        // console.log(courses.data.items);
        setCourses(courses.data.items);
      } catch (error) {
        // console.log(error.response);
      }
    }
    fetchCourses();
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
    async function fetchHangs() {
      try {
        const hangs = await getHangs();
        setHangs(hangs.data);
      } catch (error) {
      }
    }
    fetchHangs();
  }, []);
  return (
    <>
      <CRow>
        <CCol>
          <CCard className="courses-card">
            <CCardHeader><h4 className="mb-0">Danh sách khóa học</h4></CCardHeader>
            <CCardBody>
              {FilterKhoahoc({ filterSearch, setFilterSearch, filter, setFilter, addRow, setAddRow, branches, courses, hangs, getStatus })}
              <CDataTable
                addTableClasses="courses-table"
                items={courses}
                fields={fields}
                tableFilterValue={filterSearch}
                hover
                sorter
                pagination={{ align: 'center', size: 'lg' }}
                // border={true}
                scopedSlots={{
                  stt: (item, index) => {
                    return (
                      <td>
                        {index}
                      </td>
                    )
                  },
                  ten_khoa_hoc: (item) => {
                    return (
                      <td onClick={() => redirectUser(item)}>
                        <CNavLink className="p-0">{item ? item.ten_khoa_hoc : ''}</CNavLink>
                      </td>
                    )
                  },
                  branch_id: (item) => {
                    return (
                      <td className={filter.branch_id === 0 ? "d-table-cell" : "d-none"}>
                        {item.branch_name}
                      </td>
                    )
                  },
                  hang_gplx: (item) => {
                    return (
                      <td>
                        {item ? item.hang_gplx : ''}
                      </td>
                    )
                  },
                  ngay_khai_giang: (item) => {
                    return (
                      <td>
                        <Moment format="DD/MM/YYYY">{item.ngay_khai_giang}</Moment>
                      </td>
                    )
                  },
                  status: (item) => {
                    return (
                      <td className="text-center courses-status">
                        <CBadge color={getColor(item.status)}>
                          {getStatus(item.status)}
                        </CBadge>
                        {/* <CAlert className="px-2 py-0 mb-0 col-10 text-center m-auto" color={getColor(item.status)}>{getStatus(item.status)}</CAlert> */}
                      </td>
                    )
                  },
                  card_status: (item, index) => {
                    return (
                      <td className="text-center courses-card_status">
                        <CBadge color={getColorCard_status(item.card_status)}>
                          {getCard_status(item.card_status)}
                        </CBadge>
                        {/* <CAlert className="px-2 py-0 mb-0 col-10 text-center m-auto" color={getColorCard_status(item.card_status)}>{getCard_status(item.card_status)}</CAlert> */}
                      </td>
                    )
                  },
                  biometrics: (item, index) => {
                    return (
                      <td>
                        {
                          usersDataFake.find((itemFake) => itemFake.stt === index).biometrics.fingerprint
                        } <span className="pr-3 courses-icon"><CIcon name={'cil-fingerprint'} /></span>
                        {
                          usersDataFake.find((itemFake) => itemFake.stt === index).biometrics.fade_id
                        } <span className="courses-icon"><CIcon name={'cil-face'} /></span>
                      </td>
                    )
                  },
                  so_hoc_sinh: (item) => {
                    return (
                      <td>
                        {item ? item.so_hoc_sinh : ''}
                      </td>
                    )
                  },
                  data_synchronizing: (item, index) => {
                    return (
                      <td className="text-center">
                        <span className="pr-3" role="button">
                          <CBadge color={getData_synchronizing_status(usersDataFake.find((itemFake) => itemFake.stt === index).data_synchronizing)} onClick={() => setSyncRow(!syncRow)}>
                            <CIcon name={'cil-screen-smartphone'} />
                          </CBadge>
                          {/* <CAlert className="d-inline-flex p-2 mb-0" role="button" color={getData_synchronizing_status(usersDataFake.find((itemFake) => itemFake.stt === index).data_synchronizing)} onClick={() => setSyncRow(!syncRow)}>
                            <CIcon name={'cil-screen-smartphone'} />
                          </CAlert> */}
                        </span>
                        <span className="pr-3" role="button">
                          <CBadge color={"success"}>
                            <CIcon name={'cil-truck'} />
                          </CBadge>
                          {/* <CAlert className="d-inline-flex p-2 mb-0" color={"success"}>
                            <CIcon name={'cil-truck'} />
                          </CAlert> */}
                        </span>
                      </td>
                    )
                  },
                  // theory: (item, index) => {
                  //   return (
                  //     <td>
                  //       {
                  //         usersDataFake.find((itemFake) => itemFake.stt === index).theory.number
                  //       } buổi
                  //       <br />
                  //       <span className="text-disable">
                  //         ({
                  //           usersDataFake.find((itemFake) => itemFake.stt === index).theory.start_theory
                  //         }h-
                  //         {
                  //           usersDataFake.find((itemFake) => itemFake.stt === index).theory.end_theory
                  //         }h/
                  //         {
                  //           usersDataFake.find((itemFake) => itemFake.stt === index).theory.sum
                  //         }h)
                  //       </span>
                  //     </td>
                  //   )
                  // },
                  // practise: (item, index) => {
                  //   return (
                  //     <td>
                  //       {
                  //         usersDataFake.find((itemFake) => itemFake.stt === index).practise.start_practise
                  //       }-
                  //       {
                  //         usersDataFake.find((itemFake) => itemFake.stt === index).practise.end_practise
                  //       }
                  //       <br />
                  //       <span className="text-disable">
                  //         /{
                  //           usersDataFake.find((itemFake) => itemFake.stt === index).practise.sum
                  //         }km
                  //       </span>
                  //     </td>
                  //   )
                  // },
                  ngay_be_giang: (item) => {
                    return (
                      <td>
                        <Moment format="DD/MM/YYYY">{item.ngay_be_giang}</Moment>
                      </td>
                    )
                  },
                  delete_row: (item, index) => {
                    return (
                      <td className="text-center">
                        <span role="button">
                          <CIcon name={'cil-trash'} onClick={() => setDeleteRow(!deleteRow)} />
                        </span>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {ModalAddRow({ addRow, setAddRow, })}
      {ModalDeleteRow({ deleteRow, setDeleteRow, })}
      {ModalData_synchronizingRow({ syncRow, setSyncRow, })}
    </>
  );
};

export default Dashboard;
