import React from "react";
import { useHistory } from "react-router-dom";
import '../Maydiemdanh.scss';
import {
  CBadge,
  CDataTable,
  CNavLink,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import Moment from 'react-moment';
import { getStatus, getColor_StatusCards } from "../MaydiemdanhData";
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Select } from 'antd';

const MaydiemdanhTable = (props) => {
  const history = useHistory()
  const redirectUser = (item) => {
    history.push(`/hocvien?course_id=${item.id}`);
  }
  const fields = [
    { key: "stt", label: "#", },
    { key: "name", label: "TÊN MÁY", },
    { key: "manufacture", label: "Model", },
    { key: "updated_date", label: "Thời gian kết nối gần nhất", },
    { key: "status", label: "TRẠNG THÁI", },
    {
      key: "delete_row",
      label: "",
      sorter: false,
      filter: false,
    },
  ];
  return (
    <CDataTable
      addTableClasses="attendanceDevices-table"
      items={props.attendanceDevices}
      fields={fields}
      hover
      sorter
      scopedSlots={{
        stt: (item, index) => {
          return (
            <td>
              {index + 1 + (props.page.page - 1) * 50}
            </td>
          )
        },
        name: (item) => {
          return (
            <td>
              {item ? item.name : ''}
            </td>
          )
        },
        manufacture: (item) => {
          return (
            <td>
              {item ? item.manufacture : ''}
            </td>
          )
        },
        updated_date: (item) => {
          return (
            <td>
              <Moment format="DD/MM/YYYY">{item.ngay_be_giang}</Moment>
            </td>
          )
        },
        status: (item, index) => {
          return (
            <td className="attendanceDevices-status">
              <CBadge color={getColor_StatusCards(item.status)}>
                {getStatus(item.status)}
              </CBadge>
            </td>
          )
        },
        delete_row: (item, index) => {
          return (
            <td className="text-center">
              <span className="pr-3">
                <EditTwoTone twoToneColor="#3399ff" onClick={() => props.editRow.setEditRow({ ...props.editRow.editRow, item: item, on_off: true })} />
              </span>
              <span>
                <DeleteTwoTone twoToneColor="#e55353" onClick={() => props.deleteRow.setDeleteRow({ ...props.deleteRow.deleteRow, item: item, on_off: true })} />
              </span>
            </td>
          );
        },
      }}
    />
  );
};

export default MaydiemdanhTable;
