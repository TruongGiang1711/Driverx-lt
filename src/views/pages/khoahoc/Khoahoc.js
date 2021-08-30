import React, { lazy, useEffect, useState } from 'react'
import {
    CBadge,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CCallout,
    CCollapse,
    CDataTable,
} from '@coreui/react'
import usersData from '../../users/UsersData'
import { getCourses } from 'src/services/userService'

const fields = [
    { key: 'name', _style: { width: '40%' } },
    'registered',
    { key: 'role', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },
    {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    }
]

const getBadge = (status) => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}

const Dashboard = () => {
    const [details, setDetails] = useState([])
    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
        setDetails(newDetails)
    }
    useEffect(() => {
        console.log(getCourses("/courses"))
    }, [])
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Danh sách khóa học
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={usersData}
                                fields={fields}
                                columnFilter
                                tableFilter
                                itemsPerPageSelect
                                itemsPerPage={5}
                                hover
                                sorter
                                pagination={{ align: "center" }}
                                border={true}
                                scopedSlots={{
                                    'status':
                                        (item) => (
                                            <td>
                                                <CBadge color={getBadge(item.status)}>
                                                    {item.status}
                                                </CBadge>
                                            </td>
                                        ),
                                    'show_details':
                                        (item, index) => {
                                            return (
                                                <td className="py-2">
                                                    <CButton
                                                        color="primary"
                                                        variant="outline"
                                                        shape="square"
                                                        size="sm"
                                                        onClick={() => { toggleDetails(index) }}
                                                    >
                                                        {details.includes(index) ? 'Hide' : 'Show'}
                                                    </CButton>
                                                </td>
                                            )
                                        },
                                    'details':
                                        (item, index) => {
                                            return (
                                                <CCollapse show={details.includes(index)}>
                                                    <CCardBody>
                                                        <h4>
                                                            {item.username}
                                                        </h4>
                                                        <p className="text-muted">User since: {item.registered}</p>
                                                        <CButton size="sm" color="info">
                                                            User Settings
                                                        </CButton>
                                                        <CButton size="sm" color="danger" className="ml-1">
                                                            Delete
                                                        </CButton>
                                                    </CCardBody>
                                                </CCollapse>
                                            )
                                        }
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Dashboard
