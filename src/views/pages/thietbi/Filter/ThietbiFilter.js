import {
    CButton,
    CCol,
    CRow,
    CLabel,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { Input, Select } from 'antd';
import { listStatus } from "../ThietbiData";

const { Option } = Select;
const { Search } = Input;

const ThietbiFilter = (props) => {
    // console.log(props)
    const searchCourses = (value, key) => {
        switch (key) {
            case 'iconsearch':
                props.filter.setFilter({ ...props.filter.filter, serial: value })
                break;
            case 'enter':
                props.filter.setFilter({ ...props.filter.filter, serial: value.target.value })
                break;
            case 'branch':
                props.filter.setFilter({ ...props.filter.filter, branch_id: value })
                props.addRow.setAddRow({ ...props.addRow.addRow, branch_id: value })
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
                <CLabel htmlFor="ccfilter">Trạng thái</CLabel><br />
                <Select defaultValue="Tất cả" style={{ width: '100%' }} onSelect={(item) => searchCourses(item, 'status')}>
                    <Option key={'-2'} value={'-2'}>Tất cả</Option>
                    {listStatus().map((item, index) => {
                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            </CCol>
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccsearch">Serial</CLabel><br />
                <Search
                    enterButton="Tìm"
                    placeholder="Serial"
                    onSearch={(value) => searchCourses(value, 'iconsearch')}
                    onPressEnter={(value) => searchCourses(value, 'enter')}
                />
            </CCol>
            <div className="mb-3 pr-3 ml-auto">
                <CLabel htmlFor="ccadd" className="invisible">add</CLabel><br />
                <CButton block color="info" className={`ml-auto align-middle button-coreui`} disabled={props.filter.filter.branch_id === 0 ? true : false} onClick={() => props.addRow.setAddRow({ ...props.addRow.addRow, on_off: true })}>
                    <span className="pr-2"><CIcon name={'cil-plus'} /></span>Thêm thiết bị
                </CButton>
            </div>
        </CRow>
    )
};

export default ThietbiFilter;