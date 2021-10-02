import React from 'react'
import { Table } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";

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