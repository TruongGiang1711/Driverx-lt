// import { useLocation } from "react-router-dom";
import {
    CButton,
    CCol,
    CRow,
    CLabel,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { Input, Select } from 'antd';
const { Option } = Select;
const { Search } = Input;
export const FilterThe = (props) => {
    // console.log(props)
    const handleChange = (value, key) => {
        switch (key) {
            case 'name':
                props.setFilter({ ...props.filter, name: value })
                break;
            case 'enter':
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
    const listCard = [
        { id: -2, name: 'Tất cả' },
        { id: 1, name: 'Đã sử dụng' },
        { id: 0, name: 'Chưa sử dụng' },
        { id: -1, name: 'Thẻ mất' },
    ]
    return (
        <CRow className="d-flex flex-wrap-reverse">
            {(props.branches && props.branches.length > 1) ?
                <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                    <CLabel htmlFor="ccfilter">Phân hiệu</CLabel><br />
                    <Select defaultValue={props.branches[0].name} style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'branch')}>
                        {props.branches.map((item, index) => {
                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                        })}
                    </Select>
                </CCol> : undefined
            }
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccfilter">Trạng thái</CLabel><br />
                <Select defaultValue={listCard[0].name} style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'status')}>
                    {listCard.map((item, index) => {
                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            </CCol>
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccsearch">Tìm kiếm</CLabel><br />
                <Search
                    enterButton="Tìm"
                    placeholder="Tên thẻ"
                    onSearch={(item, event) => handleChange(item, 'name')}
                    onPressEnter={(item) => handleChange(item, 'enter')} />
            </CCol>
            <div className="mb-3 pr-3 ml-auto">
                <CLabel htmlFor="ccadd" className="invisible">add</CLabel><br />
                <CButton block color="info" className={`ml-auto align-middle button-coreui`} disabled={props.filter.branch_id === 0 ? true : false} onClick={() => props.setAddRow(!props.addRow)}>
                    <span className="pr-2"><CIcon name={'cil-plus'} /></span>Thêm Khóa
                </CButton>
            </div>
            {/* <div className="mb-3 pr-3">
                <CLabel htmlFor="ccimport" className="invisible">import</CLabel><br />
                <CButton block color="primary align-middle">
                    <ImportOutlined className='pr-2 d-inline-flex' />Import
                </CButton>
            </div> */}
        </CRow>
    )
}