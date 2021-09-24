import {
    CButton,
    CCol,
    CRow,
    CLabel,
} from "@coreui/react";
import { Input, Select } from 'antd';
import { useEffect, useState } from "react";
import { getStatus } from "../../../component/getBadge/GetBadge";
import { getCourses } from "src/services/coursesService";
import { getTrainees } from "src/services/traineesService";
const { Option } = Select;
const { Search } = Input;

const HocvienFilter = (props) => {
    // console.log(props)
    let timeout;
    let currentValue;
    const [idCourseUrl, setIdCourseUrl] = useState(props.courseID)
    const [courses, setCourses] = useState([])
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
                branch_id: props.filter.filter.branch_id
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
            fetchCourse(value, data => setSearch({ ...search, data }), props.filter.filter.status);
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
                props.filter.setFilter({ ...props.filter.filter, name: value.target.value })
                break;
            case 'iconsearch':
                props.filter.setFilter({ ...props.filter.filter, name: value })
                searchTrainess()
                break;
            case 'enter':
                props.filter.setFilter({ ...props.filter.filter, name: value.target.value })
                searchTrainess()
                break;
            case 'branch':
                setSearch({
                    data: [],
                })
                props.filter.setFilter({ ...props.filter.filter, branch_id: value, course_id: 0, status: -1 })
                break;
            case 'status':
                setSearch({
                    ...search,
                    data: [],
                })
                props.filter.setFilter({ ...props.filter.filter, status: value, course_id: 0, })
                break;
            case 'course':
                props.filter.setFilter({ ...props.filter.filter, course_id: value, })
                break;

            default:
                break;
        }
    };
    const searchTrainess = () => {
        async function fetchTrainees() {
            try {
                const trainees = await getTrainees(props.filter.filter);
                props.trainees.setTrainees(trainees.data.items);
                props.totalpages.setTotalpages(trainees.data.total)
            } catch (error) {
            }
        }
        fetchTrainees()
        props.page.setPage(1)
    }

    useEffect(() => {
        async function fetchTrainees() {
            const ob = {
                ...props.filter.filter,
                course_id: idCourseUrl,
            }
            try {
                const trainees = await getTrainees(ob);
                props.trainees.setTrainees(trainees.data.items);
                props.totalpages.setTotalpages(trainees.data.total)
            } catch (error) {
            }
        }
        fetchTrainees()
    }, [idCourseUrl])
    useEffect(() => {
        if (props.courseID === 0) {
            setSearch({
                data: [],
            })
            props.filter.setFilter({
                ...props.filter.filter,
                branch_id: 0,
                course_id: 0,
                status: -1,
            })
            props.page.setPage(1)
        }
        setIdCourseUrl(props.courseID)
    }, [props.courseID])

    useEffect(() => {
        async function fetchCourses() {
            const ob = {
                province_id: 0,
                customer_id: 0,
                branch_id: 0,
                name: '',
                hang: '',
                status: -1,
                page: 1
            }
            try {
                const courses = await getCourses(ob);
                setCourses(courses.data.items.sort(function (a, b) {
                    return a.id - b.id;
                }));
            } catch (error) {
            }
        }
        fetchCourses();
    }, []);
    return (
        <CRow className="d-flex flex-wrap-reverse">
            {(props.branches && props.branches.length > 1) ?
                <div className="mb-3 px-3" style={{ width: '310px' }}>
                    <CLabel htmlFor="ccfilter">Phân hiệu</CLabel><br />
                    <Select value={props.filter.filter.branch === 0 ? "Tất cả" : props.filter.filter.branch_id} style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'branch')}>
                        <Option key={0} value={0}>Tất cả</Option>
                        {props.branches.map((item, index) => {
                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                        })}
                    </Select>
                </div> : undefined
            }
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccfilter">Trạng thái khóa học</CLabel><br />
                <Select value={props.filter.filter.status === -1 ? "Tất cả" : props.filter.filter.status} style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'status')}>
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
                    value={props.filter.filter.course_id === 0 ? "Tất cả" : courses.find(item => item.id === props.filter.filter.course_id).ten_khoa_hoc || ''}
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
                <CButton block color="info" className={`ml-auto align-middle button-coreui`} disabled={props.filter.filter.branch_id === 0 ? true : false} onClick={() => props.addRow.setAddRow(!props.addRow.addRow)}>
                    Gán thẻ
                </CButton>
            </div>
        </CRow >
    )
}

export default HocvienFilter