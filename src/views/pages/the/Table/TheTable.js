
import {
    CBadge,
    CDataTable,
    CTooltip,
} from "@coreui/react";
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { getStatusCards, getColor_StatusCards } from "../TheData";

const TheTable = (props) => {
    const fields = [
        { key: "stt", label: "#", },
        { key: "card_num", label: "SỐ RFID", },
        { key: "card_name", label: "TÊN THẺ", },
        { key: "note", label: "CHÚ THÍCH", },
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
            addTableClasses="rfcards-table"
            items={props.rfcards}
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
                card_num: (item) => {
                    return (
                        <td>
                            {item.card_num}
                        </td>
                    )
                },
                card_name: (item) => {
                    return (
                        <td>
                            {item.card_name}
                        </td>
                    )
                },
                note: (item) => {
                    return (
                        <td>
                            {item ? item.hang_gplx : ''}
                        </td>
                    )
                },
                status: (item, index) => {
                    return (
                        <td>
                            <CTooltip content={item.trainee_name ? item.trainee_name : 'Không có tên'}>
                                <CBadge color={getColor_StatusCards(item.status)}>
                                    {getStatusCards(item.status)}
                                </CBadge>
                            </CTooltip>
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
    )
}

export default TheTable