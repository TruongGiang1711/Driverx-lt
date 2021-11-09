import {
    CFormGroup,
    CDataTable,
    CInputCheckbox,
} from '@coreui/react'
import { useEffect, useState } from 'react';
import { setJwtCookie } from 'src/services/authService';
const TableFP = (props) => {
    // console.log(props);
    const [arrayCookies, setArrayCookies] = useState([{
        trainee: 0,
        device: 0,
    }])
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
        setJwtCookie(props.item.id, item.device.id)
    };
    const setCheckCookie = (arr) => {
        // arr.some(ele => console.log(ele));
        // // console.log(arr.some(ele => (ele.trainee === props.item && props.item.id) && ele.device === 6));
        // return arr.some(ele => (ele.trainee === props.item && props.item.id) && ele.device === 6)
    }
    useEffect(() => {
        var cookies = document.cookie
        // console.log(cookies);
        cookies.split(/[;] */).reduce(function (result, pairStr) {
            if (pairStr) {
                var arr = pairStr.split('=');
                if (arr.length === 2) {
                    setArrayCookies([
                        ...arrayCookies, {
                            trainee: parseInt(arr[0]),
                            device: parseInt(arr[1]),
                        }])
                }
            }
        }, []);
        // console.log(arrayCookies);
        // setCheckCookie(arrayCookies)
    }, [props.item]);
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
                                        defaultChecked={arrayCookies.some(ele => (ele.trainee === props.item.id) && ele.device === item.device.id)}
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