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

const TheFilter = (props) => {
    // console.log(props)
    const searchRfCards = (value, key) => {
        switch (key) {
            case 'iconsearch':
                props.filter.setFilter({ ...props.filter.filter, card_name: value })
                break;
            case 'enter':
                props.filter.setFilter({ ...props.filter.filter, card_name: value.target.value })
                break;
            case 'branch':
                props.filter.setFilter({ ...props.filter.filter, branch_id: value })
                break;
            case 'status':
                props.filter.setFilter({ ...props.filter.filter, status: value })
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
                    <Select defaultValue={props.branches[0].name} style={{ width: '100%' }} onSelect={(item) => searchRfCards(item, 'branch')}>
                        {props.branches.map((item, index) => {
                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                        })}
                    </Select>
                </CCol> : undefined
            }
            <CCol col="6" sm="4" md="2" lg="3" xl="2" className="mb-3">
                <CLabel htmlFor="ccfilter">Trạng thái</CLabel><br />
                <Select defaultValue={listCard[0].name} style={{ width: '100%' }} onSelect={(item) => searchRfCards(item, 'status')}>
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
                    onSearch={(value) => searchRfCards(value, 'iconsearch')}
                    onPressEnter={(value) => searchRfCards(value, 'enter')}
                />
            </CCol>
            <div className="mb-3 pr-3 ml-auto">
                <CLabel htmlFor="ccadd" className="invisible">add</CLabel><br />
                <CButton block color="info" className={`ml-auto align-middle button-coreui`} onClick={() => props.addRow.setAddRow({ ...props.addRow.addRow, on_off: true })}>
                    <span className="pr-2"><CIcon name={'cil-plus'} /></span>Thêm Thẻ
                </CButton>
            </div>
        </CRow>
    )
}

export default TheFilter