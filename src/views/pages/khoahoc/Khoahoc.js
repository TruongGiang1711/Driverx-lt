import React, { lazy, useEffect, useState } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import usersData from "../../component/users/UsersData";
import { getCourses } from "src/services/userService";
import courseService from "src/services/courseService";
import { useHistory } from "react-router-dom";
import Moment from 'react-moment';

const usersDataFake = [
  { stt: 0, biometrics: { fingerprint: 20, fade_id: 30 }, data_synchronizing: 0, theory: { number: 7, start_theory: 20, end_theory: 40, sum: 90 }, practise: { start_practise: 500, end_practise: 1000, sum: 1200 } },
  { stt: 1, biometrics: { fingerprint: 10, fade_id: 20 }, data_synchronizing: 1, theory: { number: 5, start_theory: 15, end_theory: 57, sum: 90 }, practise: { start_practise: 400, end_practise: 700, sum: 1200 } },
  { stt: 2, biometrics: { fingerprint: 20, fade_id: 10 }, data_synchronizing: 2, theory: { number: 8, start_theory: 26, end_theory: 38, sum: 90 }, practise: { start_practise: 300, end_practise: 900, sum: 1200 } },
  { stt: 3, biometrics: { fingerprint: 30, fade_id: 20 }, data_synchronizing: 1, theory: { number: 10, start_theory: 11, end_theory: 41, sum: 90 }, practise: { start_practise: 1000, end_practise: 2000, sum: 1200 } },
]
const fields = [
  { key: "ten_khoa_hoc", label: "TÊN KHÓA" },
  {
    key: "hang_gplx", label: "HẠNG",
    _style: { width: "1%" },
  },
  { key: "ngay_khai_giang", label: "KHAI GIẢNG" },
  { key: "status", label: "TRẠNG THÁI" },
  { key: "card_status", label: "GÁN THẺ" },
  { key: "biometrics", label: "SINH TRẮC" },
  { key: "so_hoc_sinh", label: "SĨ SỐ" },
  {
    key: "data_synchronizing", label: "ĐỒNG BỘ DỮ LIỆU",
    _classes: "text-center",
  },
  { key: "theory", label: "LÝ THUYẾT" },
  { key: "practise", label: "THỰC HÀNH" },
  { key: "ngay_be_giang", label: "BẾ GIẢNG" },
  {
    key: "delete_row",
    label: "",
    _style: { width: "1%" },
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
  useEffect(() => {
    async function fetchCourses() {
      try {
        console.log(courseService.getHeader());
        const courses = await courseService.getCourses();
        console.log(courses.data.items);
        setCourses(courses.data.items);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchCourses();
  }, []);
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Danh sách khóa học</CCardHeader>
            <CCardBody>
              <CDataTable
                items={courses}
                fields={fields}
                // columnFilter
                tableFilter
                itemsPerPageSelect
                itemsPerPage={5}
                hover
                sorter
                pagination={{ align: "center" }}
                border={true}
                // clickableRows
                onRowClick={(item, index) => toggleDetails(index)}
                scopedSlots={{
                  ten_khoa_hoc: (item) => {
                    return (
                      <td>
                        {item ? item.ten_khoa_hoc : ''}
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
                      <td>
                        <CBadge color={getColor(item.status)}>
                          {getStatus(item.status)}
                        </CBadge>
                      </td>
                    )
                  },
                  card_status: (item, index) => {
                    return (
                      <td>
                        <CBadge color={getColorCard_status(item.card_status)}>
                          {getCard_status(item.card_status)}
                        </CBadge>
                      </td>
                    )
                  },
                  biometrics: (item, index) => {
                    return (
                      <td>
                        {
                          usersDataFake.find((itemFake) => itemFake.stt === index).biometrics.fingerprint
                        } <span className="pr-2"><CIcon name={'cil-fingerprint'} /></span>
                        {
                          usersDataFake.find((itemFake) => itemFake.stt === index).biometrics.fade_id
                        } <span className="pr-2"><CIcon name={'cil-face'} /></span>
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
                      <td>
                        <span className="pr-3">
                          <CBadge className="p-2" color={getData_synchronizing_status(usersDataFake.find((itemFake) => itemFake.stt === index).data_synchronizing)}>
                            <CIcon name={'cil-screen-smartphone'} />
                          </CBadge>
                        </span>
                        <span className="pr-3">
                          <CBadge className="p-2" color={"success"}>
                            <CIcon name={'cil-truck'} />
                          </CBadge>
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
                        <br />(
                        {
                          usersDataFake.find((itemFake) => itemFake.stt === index).theory.start_theory
                        }h-
                        {
                          usersDataFake.find((itemFake) => itemFake.stt === index).theory.end_theory
                        }h/
                        {
                          usersDataFake.find((itemFake) => itemFake.stt === index).theory.sum
                        }h)
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
                        <br />/
                        {
                          usersDataFake.find((itemFake) => itemFake.stt === index).practise.sum
                        }km
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
                      <td className="py-2">
                        <CIcon name={'cil-trash'} />
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
