// import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
    CButton,
    CCol,
    CRow,
    CLabel,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { Input, Select } from 'antd';
import { useEffect, useMemo, useState } from "react";
import { getCourses, getCoursesID, getBranches, getTrainees } from "src/services/userService";
import { getStatus } from "../../component/getBadge/GetBadge";

const { Option } = Select;
const { Search } = Input;
export const FilterKhoahoc = (props) => {
    // console.log(props)
    const queryPage = useLocation().search.match(/course_id=([0-9]+)/, '')
    const idCourseURL = Number(queryPage && queryPage[1] ? queryPage[1] : 0)
    let timeout;
    let currentValue;
    const [idCourseUrl, setIdCourseUrl] = useState(idCourseURL)
    const [branches, setBranches] = useState([]);
    const [search, setSearch] = useState({
        data: [],
        course_id: 0,
        status: -1,
        branch_id: 0,
        name: '',
    })
    const [filter, setFilter] = useState({
        name: '',
        id_card: '',
        rf_card: '',
        rf_card_name: '',
        course_id: 0,
        province_id: 0,
        customer_id: 0,
        branch_id: 0,
        page: 1
    })
    const arrStatus = []
    let listStatus = () => {
        for (let i = 0; i < 4; i++) {
            arrStatus.push({ id: i, name: getStatus(i) })
        }
        return arrStatus
    }
    const options = search.data.map(d => <Option key={d.id}>{d.name} - {d.id}</Option>);




    function fetchCourse(value, callback, status) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        function fake() {
            const ob = {
                name: value,
                status: status,
                branch_id: search.branch_id
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
    const handleSearch = value => {
        if (value) {
            fetchCourse(value, data => setSearch({ ...search, data }), search.status);
        } else {
            setSearch({
                ...search,
                data: [],
                course_id: 0,
            });
        }
    };
    const handleChange = (value, key) => {
        switch (key) {
            case 'name':
                setSearch({ ...search, name: value.target.value })
                break;
            case 'branch':
                setSearch({
                    data: [],
                    course_id: 0,
                    status: -1,
                    name: '',
                    branch_id: value,
                })
                setIdCourseUrl(0)
                break;
            case 'status':
                setSearch({
                    ...search,
                    data: [],
                    course_id: 0,
                    name: '',
                    status: value
                })
                break;
            case 'course':
                // idCourseURL !== value && setIdCourseUrl(value)
                setSearch({ ...search, course_id: value, })
                break;

            default:
                break;
        }
    };
    const searchTrainess = () => {
        setFilter({
            ...filter,
            course_id: search.course_id,
            branch_id: search.branch_id,
            name: search.name,
        })
        props.setPage(1)
    }

    useEffect(() => {
        async function fetchTrainees() {
            const ob = {
                ...filter,
                course_id: idCourseURL, // chỗ này có 2 hướng vào
                page: props.page,
            }
            try {
                const trainees = await getTrainees(ob);
                props.setTrainees(trainees.data.items);
                props.setTotalpages(trainees.data.total)
            } catch (error) {
            }
        }
        fetchTrainees()
    }, [idCourseURL, props.page, filter])
    useEffect(() => {
        async function fetchBranches() {
            const ob = {
                name: '',
                customer_id: 0,
                province_id: 0
            }
            try {
                const branches = await getBranches(ob);
                setBranches(branches.data);
            } catch (error) {
            }
        }
        fetchBranches();
        async function fetchCoursesID() {
            try {
                if (idCourseURL == 0) {
                    return
                }
                const response = await getCoursesID(idCourseURL);
                setSearch({ ...search, course_id: idCourseURL, branch_id: response.data.branch.id })
            } catch (error) {
            }
        }
        fetchCoursesID()
    }, []);
    useEffect(() => {
        // idCourseURL !== idCourseUrl && setIdCourseUrl(idCourseURL)
        if (idCourseURL === 0) {
            setSearch({
                data: [],
                course_id: 0,
                status: -1,
                branch_id: 0,
                name: '',
            })
            props.setPage(1)
        }
    }, [idCourseURL])
    return (
        <CRow className="d-flex flex-wrap-reverse">
            {(branches && branches.length > 1) ?
                <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                    <CLabel htmlFor="ccfilter">Phân hiệu</CLabel><br />
                    <Select defaultValue={"Tất cả"} value={search.branch_id} style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'branch')}>
                        <Option key={0} value={0}>Tất cả</Option>
                        {branches.map((item, index) => {
                            return <Option key={item.id} value={item.id}>{item.name} - {item.id}</Option>
                        })}
                    </Select>
                </CCol> : undefined
            }
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccfilter">Trạng thái khóa học</CLabel><br />
                <Select value={`${search.status === -1 ? "Tất cả" : search.status}`} style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'status')}>
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
                    defaultValue={"Tất cả"}
                    value={search.course_id}
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
                <Search placeholder="Tên khóa" value={search.name} onChange={(item) => handleChange(item, 'name')} />
            </CCol>
            <div className="mb-3 pr-3">
                <CLabel htmlFor="ccadd" className="invisible">Tìm</CLabel><br />
                <CButton block color="info" className={`ml-auto align-middle`} onClick={() => searchTrainess()}>
                    Tìm
                </CButton>
            </div>
            <div className="mb-3 pr-3 ml-auto">
                <CLabel htmlFor="ccadd" className="invisible">Gán</CLabel><br />
                <CButton block color="info" className={`ml-auto align-middle`} disabled={filter.branch_id === 0 ? true : false} onClick={() => props.setAddRow(!props.addRow)}>
                    Gán thẻ
                </CButton>
            </div>
        </CRow >
    )
}