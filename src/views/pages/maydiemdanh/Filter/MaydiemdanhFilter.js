import {
    CButton,
    CCol,
    CRow,
    CLabel,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { Input, Select } from 'antd';
import { listCard } from "../MaydiemdanhData";

const { Option } = Select;
const { Search } = Input;

const MaydiemdanhFilter = (props) => {
    // console.log(props)
    const searchCourses = (value, key) => {
        switch (key) {
            case 'iconsearch':
                props.filter.setFilter({ ...props.filter.filter, name: value })
                break;
            case 'enter':
                props.filter.setFilter({ ...props.filter.filter, name: value.target.value })
                break;
            case 'branch':
                props.filter.setFilter({ ...props.filter.filter, branch_id: value })
                props.addRow.setAddRow({ ...props.addRow.addRow, branch_id: value })
                break;
            case 'status':
                props.filter.setFilter({ ...props.filter.filter, status: value })
                break;
            case 'hang':
                props.filter.setFilter({ ...props.filter.filter, hang: value })
                break;

            default:
                break;
        }
    }
    return (
        <CRow className="d-flex flex-wrap-reverse">
            {(props.branches && props.branches.length > 1) ?
                <div className="mb-3 px-3" style={{ width: '310px' }}>
                    <CLabel htmlFor="ccfilter">Phân hiệu</CLabel><br />
                    <Select defaultValue="Tất cả" style={{ width: '100%' }} onSelect={(item) => searchCourses(item, 'branch')}>
                        <Option key={0} value={0}>Tất cả</Option>
                        {props.branches.map((item, index) => {
                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                        })}
                    </Select>
                </div> : undefined
            }
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccfilter">Trạng thái kết nối thiết bị</CLabel><br />
                <Select defaultValue="Tất cả" style={{ width: '100%' }} onSelect={(item) => searchCourses(item, 'status')}>
                    <Option key={'-1'} value={'-1'}>Tất cả</Option>
                    {listCard().map((item, index) => {
                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            </CCol>
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccsearch">Tìm kiếm</CLabel><br />
                <Search
                    enterButton="Tìm"
                    placeholder="Tên khóa"
                    onSearch={(value) => searchCourses(value, 'iconsearch')}
                    onPressEnter={(value) => searchCourses(value, 'enter')}
                />
            </CCol>
            <div className="mb-3 pr-3 ml-auto">
                <CLabel htmlFor="ccadd" className="invisible">add</CLabel><br />
                <CButton block color="info" className={`ml-auto align-middle button-coreui`} disabled={props.filter.filter.branch_id === 0 ? true : false} onClick={() => props.addRow.setAddRow({ ...props.addRow.addRow, on_off: true })}>
                    <span className="pr-2"><CIcon name={'cil-plus'} /></span>Thêm Máy
                </CButton>
            </div>
        </CRow>
    )
};

export default MaydiemdanhFilter;