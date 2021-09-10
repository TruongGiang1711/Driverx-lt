// import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
import {
    CButton,
    CCol,
    CRow,
    CLabel,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { Input, Select } from 'antd';
import { useEffect, useMemo, useState } from "react";
import { getCourses } from "src/services/userService";
import querystring from 'querystring';
const { Option } = Select;
const { Search } = Input;
export const FilterKhoahoc = (props) => {
    // console.log(props)
    // const KhoahocInfo_Reducer = useSelector((state) => state.KhoahocInfo_Reducer);
    // console.log(KhoahocInfo_Reducer);
    // const [initFilter, setInitFilter] = useState({})
    // const initFilter = {
    //     defaultPhanhieu: 0,
    // }
    let timeout;
    let currentValue;
    const [courses, setCourses] = useState([])
    const [dataFilter, setDataFilter] = useState({
        branch_id: 0,
        status: -1
    });
    const [search, setSearch] = useState({
        data: [],
        value: 0,
    })

    const arrStatus = []
    let listStatus = () => {
        for (let i = 0; i < 4; i++) {
            arrStatus.push({ id: i, name: props.getStatus(i) })
        }
        return arrStatus
    }


    function fetchCourse(value, callback) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        function fake() {
            const ob = {
                name: value,
                branch_id: props.filter.branch_id,
            }
            getCourses(ob)
                .then(response => response.data.items)
                .then(d => {
                    if (currentValue === value) {
                        const data = [];
                        d.map(r => {
                            data.push({
                                id: r.id,
                                name: r.ten_khoa_hoc,
                            });
                        });
                        callback(data);
                    }
                });
        }
        timeout = setTimeout(fake, 300);
    }
    useEffect(() => {
        console.log(props.filter.branch_id);
        handleSearch()
    }, [props.filter.branch_id])
    // const ob = {
    //     branch_id: props.coursesID && props.coursesID.branch && props.coursesID.branch.id,
    //     status: dataSearch.status
    // }
    // async function fetchCourses() {
    //     try {
    //         const courses = await getCourses(ob);
    //         console.log(courses.data.items);
    //         setCourses(courses.data.items);
    //     } catch (error) {
    //     }
    // }
    // fetchCourses()
    const handleSearch = value => {
        if (value) {
            fetchCourse(value, data => setSearch({ data }));
        } else {
            setSearch({ data: [], value: 0 });
        }
    };
    const handleChange = (value, key) => {
        console.log(value);
        switch (key) {
            case 'name':
                props.setFilter({ ...props.filter, name: value.target.value })
                break;
            case 'branch':
                props.setFilter({ ...props.filter, branch_id: value, course_id: 0 })
                setSearch({ ...search, value: 0 })
                break;
            case 'status':
                props.setFilter({ ...props.filter, status: value })
                break;
            case 'course':
                setSearch({ ...search, value: value })
                props.setFilter({ ...props.filter, course_id: value })
                break;

            default:
                break;
        }
    };
    const options = search.data.map(d => <Option key={d.id}>{d.name} - {d.id}</Option>);
    return (
        <CRow className="d-flex flex-wrap-reverse">
            {(props.branches && props.branches.length > 1) ?
                <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                    <CLabel htmlFor="ccfilter">Phân hiệu</CLabel><br />
                    <Select defaultValue={"Tất cả"} value={props.coursesID && props.coursesID.branch && props.coursesID.branch.id} style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'branch')}>
                        <Option key={0} value={0}>Tất cả</Option>
                        {props.branches.map((item, index) => {
                            return <Option key={item.id} value={item.id}>{item.name} - {item.id}</Option>
                        })}
                    </Select>
                </CCol> : undefined
            }
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccfilter">Trạng thái khóa học</CLabel><br />
                <Select defaultValue="Tất cả" style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'status')}>
                    <Option key={'-1'} value={'-1'}>Tất cả</Option>
                    {listStatus().map((item, index) => {
                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            </CCol>
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccfilter">Khóa học</CLabel><br />
                <Select
                    style={{ width: '100%' }}
                    showSearch
                    value={search.value}
                    placeholder="input search text"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={handleSearch}
                    onChange={(item) => handleChange(item, 'course')}
                    notFoundContent={null}
                >
                    <Option key={0} value={0}>Tất cả</Option>
                    {options}
                </Select>
            </CCol>
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccsearch">Tìm kiếm</CLabel><br />
                <Search placeholder="Tên khóa" onPressEnter={(item) => handleChange(item, 'name')} />
            </CCol>
            <div className="mb-3 pr-3">
                <CLabel htmlFor="ccadd" className="invisible">Tìm</CLabel><br />
                <CButton block color="info" className={`ml-auto align-middle`} onClick={() => props.setAddRow(!props.addRow)}>
                    Tìm
                </CButton>
            </div>
            <div className="mb-3 pr-3 ml-auto">
                <CLabel htmlFor="ccadd" className="invisible">Gán</CLabel><br />
                <CButton block color="info" className={`ml-auto align-middle`} disabled={props.filter.branch_id === 0 ? true : false} onClick={() => props.setAddRow(!props.addRow)}>
                    Gán thẻ
                </CButton>
            </div>
        </CRow >
    )
}