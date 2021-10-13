import React from "react";
import '../Thietbi.scss';
import {
  CBadge,
  CDataTable,
} from "@coreui/react";
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { getCard_status, getColor_Card_status } from "../ThietbiData";

const ThietbiTable = (props) => {
  const fields = [
    { key: "stt", label: "#", },
    { key: "serial_no", label: "Serial No", },
    { key: "manufacture", label: "Model Name", },
    { key: "imei", label: "IMEI", },
    { key: "sim", label: "Số SIM", },
    { key: "status", label: "TRẠNG THÁI", },
    { key: "connect", label: "Kết nối", },
    {
      key: "delete_row",
      label: "",
      sorter: false,
      filter: false,
    },
  ];
  return (
    <CDataTable
      addTableClasses="tracking-devices-table"
      items={props.trackingDevices}
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
        serial_no: (item) => {
          return (
            <td>
              {item.serial_no}
            </td>
          )
        },
        manufacture: (item) => {
          return (
            <td>
              {item.manufacture}
            </td>
          )
        },
        imei: (item) => {
          return (
            <td>
              {item.imei}
            </td>
          )
        },
        sim: (item) => {
          return (
            <td>
              {item.sim}
            </td>
          )
        },
        status: (item, index) => {
          return (
            <td>
              <CBadge color={getColor_Card_status(item.status)}>
                {getCard_status(item.status)}
              </CBadge>
            </td>
          )
        },
        connect: (item, index) => {
          return (
            <td>
              {item.connect}
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

export default ThietbiTable;
