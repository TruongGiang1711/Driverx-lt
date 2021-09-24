import React from 'react'
import { Table } from 'antd';

const TableIndoor = (props) => {
    return (
        <Table
            columns={props.columns}
            dataSource={props.data}
            pagination={false}
        />
    )
}

export default TableIndoor