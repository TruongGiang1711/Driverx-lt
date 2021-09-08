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
import { useState } from "react";
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
    const handleChange = (value, key) => {
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
    return (
        <CRow className="d-flex flex-wrap-reverse">
            {(props.branches && props.branches.length > 1) ?
                <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                    <CLabel htmlFor="ccfilter">Phân hiệu</CLabel><br />
                    <Select defaultValue={"Tất cả"} style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'branch')}>
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
                <Select defaultValue="" style={{ width: '100%' }} onSelect={(item) => handleChange(item, 'hang')}>
                    <Option key={''} value={''}>Tất cả</Option>
                    {props.hangs && props.hangs.map((item, index) => <Option key={item} value={item}>{item}</Option>)}
                </Select>
            </CCol>
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccsearch">Tìm kiếm</CLabel><br />
                <Search placeholder="Tên khóa" onPressEnter={(item) => handleChange(item, 'name')} />
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