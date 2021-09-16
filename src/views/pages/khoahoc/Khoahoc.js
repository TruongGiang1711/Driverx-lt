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
import { ModalAddRow, ModalDeleteRow, ModalData_synchronizingRow } from "./KhoahocModal";
import { ToastStatus } from "./KhoahocToast";
import { FilterKhoahoc } from "./KhoahocFilter";
import { Pagination, Select } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';

import { getCourses, getBranches, getHangs, updateCourse, addCourse, deleteCourse } from "src/services/userService";
import { getStatus, getColorCard_status, getCard_status, getData_synchronizing_status } from "./../../component/getBadge/GetBadge";
const { Option } = Select;

const Khoahoc = () => {
  const history = useHistory()
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [hangs, setHangs] = useState([]);
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
  const [toasts, setToasts] = useState([
    {
      position: 'top-right',
      autohide: 3000,
      show: false,
      item: undefined,
      value: 0,
      error:'',
    }
  ])
  const toasters = (() => {
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || []
      toasters[toast.position].push(toast)
      return toasters
    }, {})
  })()
  const [syncRow, setSyncRow] = useState(false);
  const [totalpages, setTotalpages] = useState(1);
  const [page, setPage] = useState(1);
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
    { key: "stt", label: "#", },
    { key: "ten_khoa_hoc", label: "TÊN KHÓA", },
    { key: "branch_id", label: "PHÂN HIỆU", _classes: filter.branch_id === 0 ? "d-table-cell" : "d-none" },
    { key: "hang_gplx", label: "HẠNG", },
    { key: "ngay_khai_giang", label: "KHAI GIẢNG", },
    { key: "status", label: "TRẠNG THÁI", },
    // { key: "card_status", label: "GÁN THẺ", },
    { key: "biometrics", label: "ĐỊNH DANH", },
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
    history.push(`/hocvien?course_id=${item.id}`);
  }

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
  }, [filter, addRow.hasData, deleteRow.delData]);
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
  const changeStatus = (item, value) => {
    async function updateStatusCourse() {
      try {
        const update = await updateCourse(item.id, value);
        if (update.statusText === "OK") {
          setToasts([
            ...toasts,
            {
              position: 'top-right',
              autohide: true && 5000,
              closeButton: true,
              fade: true,
              show: true,
              item: item,
              value: value,
              error: ''
            }
          ])
        }
      } catch (error) {
      }
    }
    updateStatusCourse()
  }

  const onDeleteRow = (id) => {
    setDeleteRow({ ...deleteRow, disable: true, loading: true })
    async function deleteCourseID() {
      try {
        const del = await deleteCourse(id);
        console.log(del);
        if (del.data.success === true) {
          setDeleteRow({ ...deleteRow, delData: del.data.success, on_off: false, disable: true, loading: false })
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
            error: error.message
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
        }
      } catch (error) {
      }
    }
    addCourseXML()
  }
  return (
    <>
      <CRow>
        <CCol>
          <CCard className="courses-card">
            <CCardHeader><h4 className="mb-0">Danh sách khóa học</h4></CCardHeader>
            <CCardBody>
              {FilterKhoahoc({ filter, setFilter, addRow, setAddRow, branches, courses, hangs, getStatus, addRow, setAddRow })}
              <CDataTable
                addTableClasses="courses-table"
                items={courses}
                fields={fields}
                hover
                sorter
                scopedSlots={{
                  stt: (item, index) => {
                    return (
                      <td>
                        {index + 1 + (page - 1) * 50}
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
                  status: (item, index) => {
                    return (
                      <td className="text-center courses-status">
                        <Select defaultValue={getStatus(item.status)} style={{ width: 120 }} onChange={(value) => changeStatus(item, value)}>
                          {listStatus().map((item, index) => {
                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                          })}
                        </Select>
                        {/* <CBadge color={getColor(item.status)}>
                          {getStatus(item.status)}
                        </CBadge> */}
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
                          getDataFake(index).biometrics.fingerprint
                        } <span className="pr-3 coreui-icon_inline"><CIcon name={'cil-fingerprint'} /></span>
                        {
                          getDataFake(index).biometrics.fade_id
                        } <span className="coreui-icon_inline"><CIcon name={'cil-face'} /></span>
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
                          <CBadge color={getData_synchronizing_status(getDataFake(index).data_synchronizing)} onClick={() => setSyncRow(!syncRow)}>
                            <CIcon name={'cil-screen-smartphone'} />
                          </CBadge>
                        </span>
                        <span className="pr-3" role="button">
                          <CBadge color={"success"}>
                            <CIcon name={'cil-truck'} />
                          </CBadge>
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
                          <DeleteTwoTone twoToneColor="#e55353" onClick={() => setDeleteRow({ item: item, on_off: true })} />
                        </span>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
            <Pagination className="core-pagination text-center pb-4" total={totalpages} pageSize={50} showSizeChanger={false} current={page} onChange={(page) => changePage(page)} />
          </CCard>
        </CCol>
      </CRow>
      {ModalAddRow({ addRow, setAddRow, onAddFileXML })}
      {ModalDeleteRow({ deleteRow, setDeleteRow, onDeleteRow })}
      {ModalData_synchronizingRow({ syncRow, setSyncRow, })}
      {ToastStatus(toasters)}
    </>
  );
};

export default Khoahoc;
