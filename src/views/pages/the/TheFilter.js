// import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
    CButton,
    CCol,
    CRow,
    CLabel,
} from "@coreui/react";
import { Input, Select } from 'antd';
import { useEffect, useState } from "react";
import { getCourses, getCoursesID, getBranches, getTrainees } from "src/services/userService";
import { getStatus } from "../../component/getBadge/GetBadge";

const { Option } = Select;
const { Search } = Input;
export const FilterKhoahoc = (props) => {
    // console.log(props)
    const queryPage = useLocation().search.match(/course_id=([0-9]+)/, '')
    const courseID = Number(queryPage && queryPage[1] ? queryPage[1] : 0)
    let timeout;
    let currentValue;
    const [idCourseUrl, setIdCourseUrl] = useState(courseID)
    const [branches, setBranches] = useState([]);
    const [search, setSearch] = useState({
        data: [],
    })
    const arrStatus = []
    let listStatus = () => {
        for (let i = 0; i < 4; i++) {
            arrStatus.push({ id: i, name: getStatus(i) })
        }
        return arrStatus
    }
    const options = search.data.map(d => <Option key={d.id} value={d.id}>{d.name}</Option>);

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
                branch_id: props.filter.branch_id
            }
            getCourses(ob)
                .then(response => response.data.items)
                .then(d => {
                    if (currentValue === value) {
                        const data = [];
                        d.map(r => {
                            return data.push({
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
            fetchCourse(value, data => setSearch({ ...search, data }), props.filter.status);
        } else {
            setSearch({
                ...search,
                data: [],
            });
        }
    };
    const handleChange = (value, key) => {
        switch (key) {
            case 'name':
                props.setFilter({ ...props.filter, name: value.target.value })
                break;
            case 'iconsearch':
                console.log(value, key);
                props.setFilter({ ...props.filter, name: value })
                searchTrainess()
                break;
            case 'enter':
                console.log(value.target.value, key);
                props.setFilter({ ...props.filter, name: value.target.value })
                searchTrainess()
                break;
            case 'branch':
                setSearch({
                    data: [],
                })
                props.setFilter({ ...props.filter, branch_id: value, course_id: 0, status: -1 })
                break;
            case 'status':
                setSearch({
                    ...search,
                    data: [],
                })
                props.setFilter({ ...props.filter, status: value, course_id: 0, })
                break;
            case 'course':
                props.setFilter({ ...props.filter, course_id: value, })
                break;

            default:
                break;
        }
    };
    const searchTrainess = () => {
        async function fetchTrainees() {
            try {
                const trainees = await getTrainees(props.filter);
                props.setTrainees(trainees.data.items);
                props.setTotalpages(trainees.data.total)
            } catch (error) {
            }
        }
        fetchTrainees()
        props.setPage(1)
    }

    useEffect(() => {
        async function fetchTrainees() {
            const ob = {
                ...props.filter,
                course_id: idCourseUrl,
            }
            try {
                const trainees = await getTrainees(ob);
                props.setTrainees(trainees.data.items);
                props.setTotalpages(trainees.data.total)
            } catch (error) {
            }
        }
        fetchTrainees()
    }, [idCourseUrl])
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
                if (courseID === 0) {
                    return
                }
                const response = await getCoursesID(courseID);
                props.setFilter({
                    ...props.filter,
                    course_id: response.data.ten_khoa_hoc,
                    branch_id: response.data.branch.id,
                    status: response.data.status,
                })
            } catch (error) {
            }
        }
        fetchCoursesID()
    }, []);
    useEffect(() => {
        if (courseID === 0) {
            setSearch({
                data: [],
            })
            props.setFilter({
                ...props.filter,
                branch_id: 0,
                course_id: 0,
                status: -1,
            })
            props.setPage(1)
        }
        setIdCourseUrl(courseID)
    }, [courseID])
    return (
        <CRow className="d-flex flex-wrap-reverse">
            {(branches && branches.length > 1) ?
                <div className="mb-3 px-3" style={{ width: '310px' }}>
                    <CLabel htmlFor="ccfilter">Phân hiệu</CLabel><br />
                    <Select value={props.filter.branch === 0 ? "Tất cả" : props.filter.branch_id} style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'branch')}>
                        <Option key={0} value={0}>Tất cả</Option>
                        {branches.map((item, index) => {
                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                        })}
                    </Select>
                </div> : undefined
            }
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccfilter">Trạng thái khóa học</CLabel><br />
                <Select value={props.filter.status === -1 ? "Tất cả" : props.filter.status} style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'status')}>
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
                    value={props.filter.course_id === 0 ? "Tất cả" : props.filter.course_id}
                    placeholder="Khóa học"
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
                <Search placeholder="Tên học viên"
                    enterButton="Tìm"
                    value={props.filter.name}
                    onChange={(item) => handleChange(item, 'name')}
                    onSearch={(item, event) => searchTrainess(item, 'iconsearch')}
                    onPressEnter={(item) => searchTrainess(item, 'enter')} />
            </CCol>
            {/* <div className="mb-3 pr-3">
                <CLabel htmlFor="ccadd" className="invisible">Tìm</CLabel><br />
                <CButton block color="info" className={`ml-auto align-middle`} onClick={() => searchTrainess()}>
                    Tìm
                </CButton>
            </div> */}
            <div className="mb-3 pr-3 ml-auto">
                <CLabel htmlFor="ccadd" className="invisible">Gán</CLabel><br />
                <CButton block color="info" className={`ml-auto align-middle button-coreui`} disabled={props.filter.branch_id === 0 ? true : false} onClick={() => props.setAddRow(!props.addRow)}>
                    Gán thẻ
                </CButton>
            </div>
        </CRow >
    )
}