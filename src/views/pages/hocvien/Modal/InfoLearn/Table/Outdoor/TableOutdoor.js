import React from 'react'
import { Table } from 'antd';

const TableOutdoor = (props) => {
    return (
        <Table
            columns={props.columns}
            expandable={{
                expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                rowExpandable: record => record.name !== 'Not Expandable',
            }}
            dataSource={props.data}
            pagination={false}
        />
    )
}

export default TableOutdoor