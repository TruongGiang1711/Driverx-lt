import React from 'react'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CTabs,
    CTabContent,
    CNav,
    CNavItem,
    CNavLink,
    CTabPane,
} from '@coreui/react'
import { Empty } from 'antd';
import TableIndoor from './Table/Indoor/TableIndoor';
import TableOutdoor from './Table/Outdoor/TableOutdoor';

const ModalInfoLearn = (props) => {
    // console.log(props);
    const columnsIndoor = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
    ];
    const columnsOutdoor = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => <a>Delete</a>,
        },
    ];

    const data = [
        {
            key: 1,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        },
        {
            key: 2,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
        },
        {
            key: 3,
            name: 'Not Expandable',
            age: 29,
            address: 'Jiangsu No. 1 Lake Park',
            description: 'This not expandable',
        },
        {
            key: 4,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
        },
    ];
    const closeModal = () => {
        props.info.setInfoLearnRow({ ...props.info.infoLearnRow, on_off: false })
    }
    const onChangeTabs = (value) => {
        props.info.setInfoLearnRow({ ...props.info.infoLearnRow, active: value })
    }
    return (
        <CModal
            show={props.info.infoLearnRow.on_off}
            onClose={closeModal}
            color="warning"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{props.info.infoLearnRow.item && props.info.infoLearnRow.item.ho_va_ten}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CTabs activeTab={`${props.info.infoLearnRow.active}`} onActiveTabChange={(value) => onChangeTabs(value)}>
                    <CNav variant="tabs">
                        <CNavItem>
                            <CNavLink data-tab="indoor">
                                Thời gian học lý thuyết
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink data-tab="outdoor">
                                Thời gian học thực hành
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink data-tab="cabin">
                                Cabin
                            </CNavLink>
                        </CNavItem>
                    </CNav>
                    <CTabContent>
                        <CTabPane data-tab="indoor">
                            <TableIndoor columns={columnsIndoor} data={data} />
                        </CTabPane>
                        <CTabPane data-tab="outdoor">
                            <TableOutdoor columns={columnsOutdoor} data={data} />
                        </CTabPane>
                        <CTabPane data-tab="cabin">
                            <Empty />
                        </CTabPane>
                    </CTabContent>
                </CTabs>
            </CModalBody>
            <CModalFooter>
                <CButton color="warning" onClick={closeModal}>
                    Đóng
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalInfoLearn