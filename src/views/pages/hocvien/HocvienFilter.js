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
    const [dataSearch, setDataSearch] = useState({
        branch_id: 0,
        status: -1
    });
    const [search, setSearch] = useState({
        data: [],
        value: undefined,
    })
    const handleChangeFilter = (value, key) => {
        switch (key) {
            case 'name':
                props.setFilter({ ...props.filter, name: value.target.value })
                break;
            case 'branch':
                props.setFilter({ ...props.filter, branch_id: value })
                break;
            case 'status':
                props.setFilter({ ...props.filter, status: value })
                break;
            case 'hang':
                props.setFilter({ ...props.filter, hang: value })
                break;

            default:
                break;
        }
    }

    const arrStatus = []
    let listStatus = () => {
        for (let i = 0; i < 4; i++) {
            arrStatus.push({ id: i, name: props.getStatus(i) })
        }
        return arrStatus
    }


    function fetch(value, callback) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        currentValue = value;
      
        function fake() {
          const str = querystring.encode({
            code: 'utf-8',
            q: value,
          });
          getCourses(str)
            .then(response => response.json())
            .then(d => {
              if (currentValue === value) {
                const { result } = d;
                const data = [];
                result.forEach(r => {
                  data.push({
                    value: r[0],
                    text: r[0],
                  });
                });
                callback(data);
              }
            });
        }
      
        timeout = setTimeout(fake, 300);
      }
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
        console.log(value);
        if (value) {
            fetch(value, data => setSearch({ data }));
        } else {
            setSearch({ data: [] });
        }
    };

    const handleChange = value => {
        console.log(value);
        switch (value) {
            case 'branch':
                setDataSearch({ ...dataSearch, branch_id: value })
                break;
            case 'status':
                setDataSearch({ ...dataSearch, status: value })
                break;

            default:
                break;
        }
        // setDataSearch({ value });
    };
    const options = search.data.map(d => <Option key={d.id}>{d.ten_khoa_hoc}</Option>);
    return (
        <CRow className="d-flex flex-wrap-reverse">
            {(props.branches && props.branches.length > 1) ?
                <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                    <CLabel htmlFor="ccfilter">Phân hiệu</CLabel><br />
                    <Select value={props.coursesID && props.coursesID.branch && props.coursesID.branch.id ? props.coursesID.branch.id : "Tất cả"} style={{ width: '100%' }} onSelect={(item) => handleChangeFilter(item, 'branch')}>
                        <Option key={0} value={0}>Tất cả</Option>
                        {props.branches.map((item, index) => {
                            return <Option key={item.id} value={item.id}>{item.name}</Option>
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
                    onChange={(item) => handleChange(item, 'branch')}
                    notFoundContent={null}
                >
                    {options}
                </Select>
                {/* <Select defaultValue="" style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'hang')}>
                    <Option key={''} value={''}>Tất cả</Option>
                    {props.hangs && props.hangs.map((item, index) => <Option key={item} value={item}>{item}</Option>)}
                </Select> */}
            </CCol>
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccsearch">Tìm kiếm</CLabel><br />
                <Search placeholder="Tên khóa" onPressEnter={(item) => handleChangeFilter(item, 'name')} />
            </CCol>
            <div className="mb-3 pr-3 ml-auto">
                <CLabel htmlFor="ccadd" className="invisible"></CLabel><br />
                <CButton block color="info" className={`ml-auto align-middle`} disabled={props.filter.branch_id === 0 ? true : false} onClick={() => props.setAddRow(!props.addRow)}>
                    Gán thẻ
                </CButton>
            </div>
            {/* <div className="mb-3 pr-3">
                <CLabel htmlFor="ccimport" className="invisible">import</CLabel><br />
                <CButton block color="primary align-middle">
                    <ImportOutlined className='pr-2 d-inline-flex' />Import
                </CButton>
            </div> */}
        </CRow >
    )
}