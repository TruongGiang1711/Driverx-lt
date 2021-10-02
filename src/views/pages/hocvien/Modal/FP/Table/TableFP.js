import {
    CFormGroup,
    CDataTable,
    CInputCheckbox,
} from '@coreui/react'
const TableFP = (props) => {
    const fields = [
        {
            key: "stt",
            label: "STT",
        },
        {
            key: "name",
            label: "Tên máy",
        },
        {
            key: "manufacture",
            label: "Thiết bị",
        },
        {
            key: "serial",
            label: "Serial",
        },
        {
            key: "status",
            label: "Trạng thái",
        },
        {
            key: "checkbox_row",
            label: "",
        },
    ];
    const changeCheck = (item, value) => {
    };
    return (
        <CDataTable
            items={props.deviesInCourse}
            fields={fields}
            size="sm"
            border
            scopedSlots={{
                stt: (item, index) => {
                    return (
                        <td>
                            {/* {index + 1 + (page - 1) * 50} */}
                            {index + 1}
                        </td>
                    );
                },
                name: (item, index) => {
                    return (
                        <td>
                            {item.device.name}
                        </td>
                    );
                },
                manufacture: (item) => {
                    return (
                        <td>
                            {item.device.manufacture}
                        </td>
                    )
                },
                serial: (item, index) => {
                    return (
                        <td>
                            {item.device.serial_no}
                        </td>
                    );
                },
                status: (item, index) => {
                    return (
                        <td>
                            {item.device.status}
                        </td>
                    );
                },
                checkbox_row: (item, index) => {
                    return (
                        <td className="text-center">
                            <span role="button">
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CInputCheckbox
                                        type="checkbox"
                                        id={index}
                                        name={item.device.name}
                                        onChange={(value) => changeCheck(item, value)}
                                        checked={item.selected || false}
                                    />
                                </CFormGroup>
                                {/* <DeleteTwoTone twoToneColor="#e55353" onClick={() => setDeleteRow({ item: item, on_off: true })} /> */}
                            </span>
                        </td>
                    );
                },
            }}
        />
    )
}
export default TableFP