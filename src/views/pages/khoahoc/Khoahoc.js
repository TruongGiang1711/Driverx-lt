import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import './Khoahoc.scss';
import {
  CAlert,
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCreateElement,
  CProgress,
  CRow,
  CCallout,
  CCollapse,
  CDataTable,
  CFormGroup,
  CInput,
  CLabel,
  CNavLink,
  CSelect,
  CPagination
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { treeData, usersDataFake } from "./KhoahocData";

import { TreeSelect, Select } from 'antd';
import { ImportOutlined } from '@ant-design/icons';

import Moment from 'react-moment';

import courseService from "src/services/courseService";
import { getCourses } from "src/services/userService";

const { SHOW_PARENT } = TreeSelect;

const fields = [
  { key: "ten_khoa_hoc", label: "TÊN KHÓA", },
  { key: "hang_gplx", label: "HẠNG", },
  { key: "ngay_khai_giang", label: "KHAI GIẢNG", },
  { key: "status", label: "TRẠNG THÁI", _classes: "text-center", },
  { key: "card_status", label: "GÁN THẺ", _classes: "text-center", },
  { key: "biometrics", label: "SINH TRẮC", },
  { key: "so_hoc_sinh", label: "SĨ SỐ", },
  { key: "data_synchronizing", label: "ĐỒNG BỘ DỮ LIỆU", _classes: "text-center", },
  { key: "theory", label: "LÝ THUYẾT", },
  { key: "practise", label: "THỰC HÀNH" },
  { key: "ngay_be_giang", label: "BẾ GIẢNG" },
  {
    key: "delete_row",
    label: "",
    sorter: false,
    filter: false,
  },
];

const getColor = (status) => {
  switch (status) {
    case 3: return 'success'
    case 2: return 'primary'
    case 1: return 'warning'
    case 0: return 'danger'
    default: return
  }
};
const getStatus = (status) => {
  switch (status) {
    case 3: return 'Kết thúc'
    case 2: return 'Thực hành'
    case 1: return 'Lý thuyết'
    case 0: return 'Chưa diễn ra'
    default: return
  }
};

const getColorCard_status = (status) => {
  switch (status) {
    case 1: return 'success'
    case 0: return 'danger'
    default: return
  }
};
const getCard_status = (status) => {
  switch (status) {
    case 1: return 'Đã gán thẻ'
    case 0: return 'Chưa gán thẻ'
    default: return
  }
};

const getData_synchronizing_status = (status) => {
  switch (status) {
    case 2: return 'secondary'
    case 1: return 'success'
    case 0: return 'danger'
    default: return
  }
};

// console.log(usersDataFake.find((itemFake) => itemFake.stt === 3).data_synchronizing)
const Dashboard = () => {
  const history = useHistory()
  const [details, setDetails] = useState([]);
  const [courses, setCourses] = useState([]);
  const [state, setState] = useState({});
  const [value, setValue] = useState([])
  // const createMarkup = () => {
  //   return {
  //     __html: <CRow className="no-gutter">
  //       {/* <CCol col="6" sm="4" md="2" xl="2" className="mb-3">
  //   <CLabel htmlFor="ccsearch">Tìm kiếm</CLabel>
  //   <Select {...selectProps} />
  // </CCol> */}
  //       <CCol col="6" sm="4" md="2" xl="2" className="mb-3">
  //         <CLabel htmlFor="ccfilter">Bộ lọc</CLabel>
  //         <TreeSelect {...tProps} />
  //       </CCol>
  //       <CCol col="6" sm="4" md="2" xl="2" className="mb-3 ml-auto">
  //         <CLabel htmlFor="ccadd" className="invisible">add</CLabel>
  //         <CButton block color="info" className="col-7 ml-auto align-middle">
  //           <span className="pr-2 courses-icon"><CIcon name={'cil-plus'} /></span>
  //           <span>Thêm Khóa</span>
  //         </CButton>
  //       </CCol>
  //       <CCol col="6" sm="4" md="2" xl="1" className="mb-3">
  //         <CLabel htmlFor="ccimport" className="invisible">import</CLabel>
  //         <CButton block color="primary align-middle"><ImportOutlined className='pr-2 d-inline-flex' />Import</CButton>
  //       </CCol>
  //     </CRow>
  //   }
  // }
  // const innerRefAdd = (item) => {
  //   console.log(item)
  //   // document.getElementsByClassName('.c-datatable-filter')
  // }

  // tìm kiếm
  const options = [];
  courses.map((item, index) => {
    options.push({
      label: item.ten_khoa_hoc,
      value: item.ma_khoa_hoc
    });
  })
  const selectProps = {
    mode: 'multiple',
    style: {
      width: '100%',
    },
    value,
    options,
    onChange: (newValue) => {
      setValue(newValue);
      handleFilter(newValue)
    },
    placeholder: 'Tên khóa ....',
    maxTagCount: 'responsive',
    showArrow: true,
  };
  const handleFilter = (value) => {
    console.log(value)
  }
  // lọc
  const tProps = {
    treeData,
    value: state.value,
    onChange: (value) => {
      setState(value);
    },
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Lọc theo ....',
    style: {
      width: '100%',
    },
    maxTagCount: 'responsive',
    showArrow: true,
    showSearch: false,
  };
  // toogleDetails
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };
  const redirectUser = (item) => {
    // console.log(item)
    history.push(`/users/${item.id}`)
  }
  useEffect(() => {
    async function fetchCourses() {
      try {
        // console.log(courseService.getHeader());
        const courses = await courseService.getCourses();
        // console.log(courses.data.items);
        setCourses(courses.data.items);
      } catch (error) {
        // console.log(error.response);
      }
    }
    fetchCourses();
  }, []);
  return (
    <>
      <CRow>
        <CCol>
          <CCard className="courses-card">
            <CCardHeader><h4 className="mb-0">Danh sách khóa học</h4></CCardHeader>
            <CCardBody>
              <CRow>
                <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                  <CLabel htmlFor="ccsearch">Tìm kiếm</CLabel>
                  <Select {...selectProps} />
                </CCol>
                <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                  <CLabel htmlFor="ccfilter">Bộ lọc</CLabel>
                  <TreeSelect {...tProps} />
                </CCol>
                <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3 ml-auto">
                  <CLabel htmlFor="ccadd" className="invisible">add</CLabel>
                  <CButton block color="info" className="col-xl-7 ml-auto align-middle">
                    <span className="pr-2 courses-icon"><CIcon name={'cil-plus'} /></span>
                    <span>Thêm Khóa</span>
                  </CButton>
                </CCol>
                <CCol col="6" sm="4" md="2" lg="3" xl="1" className="mb-3">
                  <CLabel htmlFor="ccimport" className="invisible">import</CLabel>
                  <CButton block color="primary align-middle"><ImportOutlined className='pr-2 d-inline-flex' />Import</CButton>
                </CCol>
              </CRow>

              <CDataTable
                addTableClasses="courses-table"
                // innerRef={(item, index) => innerRefAdd(item)}
                items={courses}
                fields={fields}
                // columnFilter
                // tableFilter
                // onTableFilterChange={handleFilter}
                // itemsPerPageSelect
                itemsPerPage={2}
                hover
                sorter
                pagination={{ align: 'center', size: 'lg' }}
                border={true}
                // clickableRows
                // onRowClick={(item, index) => toggleDetails(index)}
                scopedSlots={{
                  ten_khoa_hoc: (item) => {
                    return (
                      <td onClick={() => redirectUser(item)}>
                        <CNavLink>{item ? item.ten_khoa_hoc : ''}</CNavLink>
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
                      <td className="courses-status">
                        <CAlert className="px-2 py-0 mb-0 col-10 text-center m-auto" color={getColor(item.status)}>{getStatus(item.status)}</CAlert>
                      </td>
                    )
                  },
                  card_status: (item, index) => {
                    return (
                      <td className="courses-card_status">
                        <CAlert className="px-2 py-0 mb-0 col-10 text-center m-auto" color={getColorCard_status(item.card_status)}>{getCard_status(item.card_status)}</CAlert>
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
                        <span className="pr-3">
                          <CAlert className="d-inline-flex p-2 mb-0" color={getData_synchronizing_status(usersDataFake.find((itemFake) => itemFake.stt === index).data_synchronizing)}>
                            <CIcon name={'cil-screen-smartphone'} />
                          </CAlert>
                        </span>
                        <span className="pr-3">
                          <CAlert className="d-inline-flex p-2 mb-0" color={"success"}>
                            <CIcon name={'cil-truck'} />
                          </CAlert>
                        </span>
                      </td>
                    )
                  },
                  theory: (item, index) => {
                    return (
                      <td>
                        {
                          usersDataFake.find((itemFake) => itemFake.stt === index).theory.number
                        } buổi
                        <br />
                        <span className="text-disable">
                          ({
                            usersDataFake.find((itemFake) => itemFake.stt === index).theory.start_theory
                          }h-
                          {
                            usersDataFake.find((itemFake) => itemFake.stt === index).theory.end_theory
                          }h/
                          {
                            usersDataFake.find((itemFake) => itemFake.stt === index).theory.sum
                          }h)
                        </span>
                      </td>
                    )
                  },
                  practise: (item, index) => {
                    return (
                      <td>
                        {
                          usersDataFake.find((itemFake) => itemFake.stt === index).practise.start_practise
                        }-
                        {
                          usersDataFake.find((itemFake) => itemFake.stt === index).practise.end_practise
                        }
                        <br />
                        <span className="text-disable">
                          /{
                            usersDataFake.find((itemFake) => itemFake.stt === index).practise.sum
                          }km
                        </span>
                      </td>
                    )
                  },
                  ngay_be_giang: (item) => {
                    return (
                      <td>
                        <Moment format="DD/MM/YYYY">{item.ngay_be_giang}</Moment>
                      </td>
                    )
                  },
                  delete_row: (item, index) => {
                    return (
                      <td className="align-middle py-2">
                        <span className="pr-2 courses-icon">
                          <CIcon name={'cil-trash'} />
                        </span>
                        <span onClick={() => toggleDetails(index)}>
                          <CIcon name={'cil-caret-' + (details.includes(index) ? 'top' : 'bottom')} />
                        </span>
                      </td>
                    );
                  },
                  details: (item, index) => {
                    return (
                      <CCollapse show={details.includes(index)}>
                        <CCardBody>
                          <h4>{item.username}</h4>
                          <p className="text-muted">
                            User since: {item.registered}
                          </p>
                          <CButton size="sm" color="info">
                            User Settings
                          </CButton>
                          <CButton size="sm" color="danger" className="ml-1">
                            Delete
                          </CButton>
                        </CCardBody>
                      </CCollapse>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
