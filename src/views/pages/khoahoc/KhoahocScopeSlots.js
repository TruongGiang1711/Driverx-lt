import React from "react";
import { useHistory } from "react-router-dom";
import {
    CBadge,
    CNavLink,
} from "@coreui/react";
import Moment from 'react-moment';
import CIcon from '@coreui/icons-react'
import { listStatus, getDataFake } from "./KhoahocData";
import { DeleteTwoTone } from '@ant-design/icons';
import { Select } from 'antd';
import { getColor, getStatus, getColorCard_status, getCard_status, getData_synchronizing_status } from "./../../component/getBadge/GetBadge";
import { updateCourse } from "src/services/coursesService";
const { Option } = Select;

const ScopeSlotsTable = (props) => {
    console.log(props)
    const history = useHistory()
    const redirectUser = (item) => {
        history.push(`/hocvien?course_id=${item.id}`);
    }
    const changeStatus = (item, value) => {
        async function updateStatusCourse() {
            try {
                const update = await updateCourse(item.id, value);
                if (update.statusText === "OK") {
                    props.statusColor.setStatusColor(update.data.status)
                    props.toasts.setToasts([
                        ...props.toasts.toasts,
                        {
                            position: 'top-right',
                            autohide: true && 5000,
                            closeButton: true,
                            fade: true,
                            show: true,
                            item: item,
                            value: value,
                            error: `Đã cập nhật trạng thái ${getStatus(value)} cho khóa ${item.ten_khoa_hoc}!`,
                            statusColor: update.data.status,
                        }
                    ])
                }
            } catch (error) {
                props.toasts.setToasts([
                    ...props.toasts.toasts,
                    {
                        position: 'top-right',
                        autohide: true && 5000,
                        closeButton: true,
                        fade: true,
                        show: true,
                        item: item,
                        value: value,
                        error: `Cập nhật trạng thái ${getStatus(item.id)} cho khóa ${item.ten_khoa_hoc} không thành công!`,
                        statusColor: -1,
                    }
                ])
            }
        }
        updateStatusCourse()
    }
    return Object.keys(props).map((key) => ({
        stt: (item, index) => {
            return (
                <td>
                    {index + 1 + (props.page.page - 1) * 50}
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
                <td className={props.filter.filter.branch_id === 0 ? "d-table-cell" : "d-none"}>
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
                    <Select defaultValue={getStatus(item.status)} className={getColor(item.status)} style={{ width: 120 }} onChange={(value) => changeStatus(item, value)}>
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
                        <CBadge color={getData_synchronizing_status(getDataFake(index).data_synchronizing)} onClick={() => props.getDataCourseDevices(item)}>
                            <CIcon name={'cil-screen-smartphone'} />
                        </CBadge>
                    </span>
                    <span className="pr-3" role="button">
                        <CBadge color={"success"} onClick={() => props.getDataCourseVehicles(item)}>
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
                        <DeleteTwoTone twoToneColor="#e55353" onClick={() => props.deleteRow.setDeleteRow({ ...props.deleteRow.deleteRow, item: item, on_off: true })} />
                    </span>
                </td>
            );
        },
    }))
}

export default ScopeSlotsTable;