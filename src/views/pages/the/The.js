import React, { useState } from "react";
import './The.scss';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CImg,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { ModalAddRow, ModalDeleteRow, ModalData_synchronizingRow } from "./TheModal";
import { FilterKhoahoc } from "./TheFilter";
import { Pagination } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

import { getTrainees } from "src/services/userService";

const The = () => {
  // const queryPage = useLocation().search.match(/course_id=([0-9]+)/, '')
  // const idCourseURL = Number(queryPage && queryPage[1] ? queryPage[1] : 0)
  // const history = useHistory()
  const [trainees, setTrainees] = useState([]);
  const [totalpages, setTotalpages] = useState(1);
  const [page, setPage] = useState(1);
  const [addRow, setAddRow] = useState(false)
  const [deleteRow, setDeleteRow] = useState(false)
  const [syncRow, setSyncRow] = useState(false)
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
  const fields = [
    { key: "so_tt", label: "#", },
    { key: "anh_chan_dung", label: "ẢNH", },
    { key: "id", label: "MÃ", },
    { key: "ho_va_ten", label: "HỌ VÀ TÊN", },
    { key: "ngay_sinh", label: "NGÀY SINH", },
    { key: "gioi_tinh", label: "GIỚI TÍNH", },
    { key: "so_cmt", label: "CMND", },
    { key: "rfid_card", label: "TÊN THẺ", },
    { key: "fingerprint_and_face_count", label: "ĐỊNH DANH", },
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
  return (
    <>
      <CRow>
        <CCol>
          <CCard className="trainess-card">
            <CCardHeader><h4 className="mb-0">Danh sách học viên</h4></CCardHeader>
            <CCardBody>
              {FilterKhoahoc({ addRow, setAddRow, trainees, setTrainees, totalpages, setTotalpages, page, setPage, filter, setFilter })}
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
                        {index + 1 + (page - 1) * 50}
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
            <Pagination className="core-pagination text-center pb-4" total={totalpages} pageSize={50} showSizeChanger={false} current={page} onChange={(page) => changePage(page)} />
          </CCard>
        </CCol>
      </CRow>
      {ModalAddRow({ addRow, setAddRow, })}
      {ModalDeleteRow({ deleteRow, setDeleteRow, })}
      {ModalData_synchronizingRow({ syncRow, setSyncRow, })}
    </>
  );
};

export default React.memo(The);
