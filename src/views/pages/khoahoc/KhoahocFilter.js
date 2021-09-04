import {
    CButton,
    CCol,
    CRow,
    CLabel,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { ImportOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
const { Option } = Select;
export const FilterKhoahoc = (props) => {
    // console.log(props)
    const handleSearch = (value) => {
        props.setFilterSearch(value.target.value)
    }
    const handleChange = (value, key) => {
        switch (key) {
            case 'branch':
                props.setFilter({ ...props.filter, branch_id: value })
                break;
            case 'status':
                props.setFilter({ ...props.filter, status: value })
                break;
            case 'hang':
                props.setFilter({ ...props.filter, hang_gplx: value })
                break;

            default:
                break;
        }
    }
    
    let myArrayHangWithNoDuplicates = props.courses.reduce((prev, cur) => {
        if (prev.indexOf(cur.hang_gplx) === -1) {
            prev.push(cur.hang_gplx)
        }
        return prev.map((item, index) => item)
    }, [])

    const arrStatus = []
    let listStatus = () => {
        for (let i = 0; i < 4; i++) {
            arrStatus.push({ id: i, name: props.getStatus(i) })
        }
        return arrStatus
    }

    return (
        <CRow>
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccsearch">Tìm kiếm</CLabel><br />
                <Input placeholder="Basic usage" onChange={handleSearch} />
            </CCol>
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccfilter">Phân hiệu</CLabel><br />
                <Select defaultValue="" style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'branch')}>
                    <Option key={''} value={''}>Tất cả</Option>
                    {props.branches.map((item, index) => {
                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            </CCol>
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccfilter">Trạng thái</CLabel><br />
                <Select defaultValue="" style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'status')}>
                    <Option key={''} value={''}>Tất cả</Option>
                    {listStatus().map((item, index) => {
                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            </CCol>
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccfilter">Hạng</CLabel><br />
                <Select defaultValue="" style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'hang')}>
                    <Option key={''} value={''}>Tất cả</Option>
                    {myArrayHangWithNoDuplicates.map((item, index) => <Option key={item} value={item}>{item}</Option>)}
                </Select>
            </CCol>
            <div className="mb-3 pr-3 ml-auto">
                <CLabel htmlFor="ccadd" className="invisible">add</CLabel><br />
                <CButton block color="info" className="ml-auto align-middle">
                    <span className="pr-2 courses-icon"><CIcon name={'cil-plus'} /></span>
                    <span>Thêm Khóa</span>
                </CButton>
            </div>
            <div className="mb-3 pr-3">
                <CLabel htmlFor="ccimport" className="invisible">import</CLabel><br />
                <CButton block color="primary align-middle">
                    <ImportOutlined className='pr-2 d-inline-flex' />Import
                </CButton>
            </div>
        </CRow>
    )
}