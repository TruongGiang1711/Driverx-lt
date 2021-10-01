import React from "react";
import {
    CDataTable,
    CImg,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { getSex } from "../HocvienData";

const HocvienTable = (props) => {
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

    return (
        <CDataTable
            addTableClasses="trainess-table"
            items={props.trainees}
            fields={fields}
            size={'sm'}
            hover
            sorter
            border
            scopedSlots={{
                so_tt: (item, index) => {
                    return (
                        <td>
                            {index + 1 + (props.page.page - 1) * 50}
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
                            {item.fingerprint_count}&nbsp;
                            <span className="pr-3 coreui-icon_inline" role="button" onClick={() => props.fpRow.setFPRow({ ...props.fpRow.fpRow, item: item, on_off: true })}>
                                <CIcon name={'cil-fingerprint'} />
                            </span>
                            {item.face_count} <span className="coreui-icon_inline"><CIcon name={'cil-face'} /></span>
                        </td>
                    )
                },
                hours_indoor: (item) => {
                    return (
                        <td>
                            <span className="pr-3" role="button" onClick={() => props.info.setInfoLearnRow({ ...props.info.infoLearnRow, item: item, on_off: true, active: "indoor" })} >
                                {item.indoor_hour}h
                            </span>
                        </td>
                    )
                },
                info_outdoor: (item) => {
                    return (
                        <td>
                            <span className="pr-3" role="button" onClick={() => props.info.setInfoLearnRow({ ...props.info.infoLearnRow, item: item, on_off: true, active: "outdoor" })} >
                                {item.outdoor_hour}h/1200km
                            </span>
                        </td>
                    )
                },
                delete_edit_row: (item, index) => {
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
    )
}
export default HocvienTable