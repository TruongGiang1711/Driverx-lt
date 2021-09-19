import {
    CButton,
    CCol,
    CRow,
    CLabel,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { Input, Select } from 'antd';
import { listStatus } from "./../KhoahocData";

const { Option } = Select;
const { Search } = Input;

const KhoahocFilter = (props) => {
    // console.log(props)
    const handleChange = (value, key) => {
        switch (key) {
            case 'name':
                console.log(value);
                props.filter.setFilter({ ...props.filter.filter, name: value })
                break;
            case 'enter':
                console.log(value.target.value);
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
                    <Select defaultValue="Tất cả" style={{ width: '100%' }} style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'branch')}>
                        <Option key={0} value={0}>Tất cả</Option>
                        {props.branches.map((item, index) => {
                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                        })}
                    </Select>
                </div> : undefined
            }
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccfilter">Trạng thái</CLabel><br />
                <Select defaultValue="Tất cả" style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'status')}>
                    <Option key={'-1'} value={'-1'}>Tất cả</Option>
                    {listStatus().map((item, index) => {
                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            </CCol>
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccfilter">Hạng</CLabel><br />
                <Select defaultValue="" style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'hang')}>
                    <Option key={''} value={''}>Tất cả</Option>
                    {props.hangs && props.hangs.map((item, index) => <Option key={item} value={item}>{item}</Option>)}
                </Select>
            </CCol>
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccsearch">Tìm kiếm</CLabel><br />
                <Search
                    enterButton="Tìm"
                    placeholder="Tên khóa"
                    onPressEnter={(value) => handleChange(value, 'enter')}
                    onSearch={(value) => handleChange(value, 'name')}
                />
            </CCol>
            <div className="mb-3 pr-3 ml-auto">
                <CLabel htmlFor="ccadd" className="invisible">add</CLabel><br />
                <CButton block color="info" className={`ml-auto align-middle button-coreui`} disabled={props.filter.filter.branch_id === 0 ? true : false} onClick={() => props.addRow.setAddRow({ ...props.addRow.addRow, on_off: true })}>
                    <span className="pr-2"><CIcon name={'cil-plus'} /></span>Thêm Khóa
                </CButton>
            </div>
        </CRow>
    )
};

export default KhoahocFilter;