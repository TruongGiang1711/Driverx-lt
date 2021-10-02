import React from 'react'
import {
    CRow,
    CCol,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Table } from 'antd';
import { ProfileOutlined, ProfileFilled } from "@ant-design/icons";

const TableOutdoor = (props) => {
    return (
        <Table
            columns={props.columns}
            expandIconColumnIndex={4}
            expandable={{
                columnWidth: 100,
                expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                rowExpandable: record => record.name !== 'Not Expandable',
                expandIcon: ({ expanded, onExpand, record }) =>
                    <CRow className="no-gutters m-auto" style={{ width: 70 }}>
                        <CCol className={record.name !== 'Not Expandable' ? 'visible' : 'invisible'}>
                            {
                                expanded ?
                                    (<ProfileFilled onClick={e => onExpand(record, e)} style={{ fontSize: '30px' }} />)
                                    :
                                    (<ProfileOutlined onClick={e => onExpand(record, e)} style={{ fontSize: '30px' }} />)
                            }
                        </CCol>
                        <CCol className='text-nowrap'>
                            <CIcon name={'cil-location-pin'} width='2rem' height='2rem' />
                        </CCol>
                    </CRow>
            }}
            dataSource={props.data}
            pagination={false}
            scroll={{ y: 240 }}
            size="small"
            summary={() => (
                <Table.Summary fixed>
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>Tổng cộng</Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>Tổng qđ</Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>Tổng time</Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>Tổng phiên</Table.Summary.Cell>
                    </Table.Summary.Row>
                </Table.Summary>
            )}
        />
    )
}

export default TableOutdoor