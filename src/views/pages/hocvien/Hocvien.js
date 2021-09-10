import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import './Hocvien.scss';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CImg,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import Moment from 'react-moment';
import { usersDataFake } from "./HocvienData";
import { ModalAddRow, ModalDeleteRow, ModalData_synchronizingRow } from "./HocvienModal";
import { FilterKhoahoc } from "./HocvienFilter";
import { Pagination } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

import { getCourses, getCoursesID, getBranches, getHangs, getTrainees } from "src/services/userService";
import { getColor, getStatus, getColorCard_status, getCard_status, getData_synchronizing_status } from "../../component/getBadge/GetBadge";

const Hocvien = () => {
  const queryPage = useLocation().search.match(/course_id=([0-9]+)/, '')
  const idCourseURL = Number(queryPage && queryPage[1] ? queryPage[1] : 0)
  const [page, setPage] = useState(idCourseURL)
  // console.log(idCourseURL);
  const history = useHistory()
  const [courses, setCourses] = useState([]);
  const [coursesID, setCoursesID] = useState({});
  const [branches, setBranches] = useState([]);
  const [hangs, setHangs] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [totalpages, setTotalpages] = useState(1);
  const [pages, setPages] = useState(1);
  const [addRow, setAddRow] = useState(false)
  const [deleteRow, setDeleteRow] = useState(false)
  const [syncRow, setSyncRow] = useState(false)
  const [filterSearch, setFilterSearch] = useState('')
  const [filter, setFilter] = useState({
    name: '',
    id_card: '',
    rf_card: '',
    rf_card_name: '',
    course_id: 0,
    province_id: 0,
    customer_id: 0,
    branch_id: 0,
    page: 1
  })
  const fields = [
    { key: "so_tt", label: "#", },
    { key: "anh_chan_dung", label: "ẢNH", },
    { key: "id", label: "MÃ", },
    { key: "ho_va_ten", label: "HỌ VÀ TÊN", },
    { key: "ngay_sinh", label: "NGÀY SINH", },
    { key: "gioi_tinh", label: "GIỚI TÍNH", },
    { key: "so_cmt", label: "CMND", },
    { key: "rfid_card", label: "SỐ THẺ RFID", },
    { key: "fingerprint_and_face_count", label: "TRẠNG THÁI ĐỊNH DANH", },
    { key: "hours_indoor", label: "SỐ GIỜ HỌC LÝ THUYẾT", },
    { key: "info_outdoor", label: "THÔNG TIN HỌC THỰC HÀNH", },
    {
      key: "delete_edit_row",
      label: "",
      sorter: false,
      filter: false,
    },
  ];
  const getSex = (sex) => {
    switch (sex) {
      case 'M': return 'Nam'
      case 'F': return 'Nữ'
      default: return
    }
  };
  // console.log(courses, "++++++++++++", match);
  // const user = courses && courses.find(user => user.id.toString() === match.params.id)
  // const userDetails = user ? Object.entries(user) :
  //   [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
  // console.log(userDetails);

  // const redirectUser = (item) => {
  // }
  // useEffect(() => {
  //   async function fetchTrainees() {
  //     const ob = {
  //       ...filter,
  //       course_id: idCourseURL,
  //       branch_id: coursesID.branch && coursesID.branch.id ? coursesID.branch.id : 0,
  //       page: pages,
  //     }
  //     try {
  //       const trainees = await getTrainees(ob);
  //       setTotalpages(trainees.data.total)
  //       setTrainees(trainees.data.items);
  //     } catch (error) {
  //     }
  //   }
  //   fetchTrainees()
  // }, [coursesID])


  // useEffect(() => {
  //   console.log(filter);
  //   let localCoursesID = {};
  //   // idCourseURL !== page && setPage(idCourseURL)
  //   setCoursesID({})
  //   async function fetchCoursesID() {
  //     try {
  //       if (idCourseURL == 0) {
  //         return
  //       }
  //       const response = await getCoursesID(idCourseURL);
  //       localCoursesID = response.data;
  //       setCoursesID(localCoursesID)
  //     } catch (error) {
  //     }
  //   }
  //   async function fetchData() {
  //     try {
  //       if (idCourseURL != 0) {
  //       }
  //       await fetchCoursesID()
  //     }
  //     catch (error) {
  //     }
  //   }
  //   fetchData();
  // }, [idCourseURL, pages, filter])
  // useEffect(() => {
  //   const ob = {
  //     ...filter,
  //     page: pages,
  //   }
  //   async function fetchTrainees() {
  //     try {
  //       const trainees = await getTrainees(ob);
  //       setTotalpages(trainees.data.total)
  //       setTrainees(trainees.data.items);
  //     } catch (error) {
  //     }
  //   }
  //   fetchTrainees();
  // }, [filter, pages]);
  useEffect(() => {
    async function fetchTrainees() {
      // const ob = {
      //   ...filter,
      //   course_id: idCourseURL,
      //   branch_id: coursesID.branch && coursesID.branch.id ? coursesID.branch.id : 0,
      //   page: pages,
      // }
      try {
        const trainees = await getTrainees(filter);
        setTrainees(trainees.data.items);
        setTotalpages(trainees.data.total)
      } catch (error) {
      }
    }
    fetchTrainees()
  }, [filter])
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
    setPages(page)
  }
  return (
    <>
      <CRow>
        <CCol>
          <CCard className="trainess-card">
            <CCardHeader><h4 className="mb-0">Danh sách khóa học</h4></CCardHeader>
            <CCardBody>
              {FilterKhoahoc({ filter, setFilter, addRow, setAddRow, branches, courses, coursesID, hangs, getStatus })}
              <CDataTable
                addTableClasses="trainess-table"
                items={trainees}
                fields={fields}
                // tableFilterValue={filterSearch}
                // itemsPerPage={50}
                size={'sm'}
                hover
                sorter
                border
                scopedSlots={{
                  so_tt: (item, index) => {
                    return (
                      <td>
                        {index + 1 + (pages - 1) * 50}
                      </td>
                    )
                  },
                  anh_chan_dung: (item) => {
                    return (
                      <td>
                        <CImg
                          src={item.anh_chan_dung}
                          alt={item.anh_chan_dung}
                          width={50}
                          height={50}
                          shape={"rounded-circle"}
                        />
                      </td>
                    )
                  },
                  id: (item) => {
                    return (
                      <td>
                        {item.id}
                      </td>
                    )
                  },
                  ho_va_ten: (item) => {
                    return (
                      <td>
                        {item.ho_va_ten}
                      </td>
                    )
                  },
                  ngay_sinh: (item) => {
                    return (
                      <td>
                        {item.ngay_sinh}
                      </td>
                    )
                  },
                  gioi_tinh: (item, index) => {
                    return (
                      <td>
                        {getSex(item.gioi_tinh)}
                      </td>
                    )
                  },
                  so_cmt: (item) => {
                    return (
                      <td>
                        {item.so_cmt}
                      </td>
                    )
                  },
                  rfid_card: (item, index) => {
                    return (
                      <td>
                        {item.rfid_card}
                      </td>
                    )
                  },
                  fingerprint_and_face_count: (item, index) => {
                    return (
                      <td>
                        {item.fingerprint_count} <span className="pr-3 coreui-icon_inline"><CIcon name={'cil-fingerprint'} /></span>
                        {item.face_count} <span className="coreui-icon_inline"><CIcon name={'cil-face'} /></span>
                      </td>
                    )
                  },
                  hours_indoor: (item) => {
                    return (
                      <td>
                        {item.indoor_hour}h
                      </td>
                    )
                  },
                  info_outdoor: (item) => {
                    return (
                      <td>
                        {item.outdoor_hour}h/1200km
                      </td>
                    )
                  },
                  delete_edit_row: (item, index) => {
                    return (
                      <td className="text-center">
                        <span className="pr-3">
                          <EditTwoTone role="button" twoToneColor="#3399ff" />
                        </span>
                        <span role="button">
                          <DeleteTwoTone twoToneColor="#e55353" onClick={() => setDeleteRow(!deleteRow)} />
                        </span>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
            <Pagination total={totalpages} pageSize={50} showSizeChanger={false} onChange={(page) => changePage(page)} />
          </CCard>
        </CCol>
      </CRow>
      {ModalAddRow({ addRow, setAddRow, })}
      {ModalDeleteRow({ deleteRow, setDeleteRow, })}
      {ModalData_synchronizingRow({ syncRow, setSyncRow, })}
    </>
  );
};

export default React.memo(Hocvien);
