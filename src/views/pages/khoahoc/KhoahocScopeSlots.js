import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    CAlert,
    CButton,
    CCardBody,
    CCollapse,
    CNavLink,
} from "@coreui/react";
import Moment from 'react-moment';
import CIcon from '@coreui/icons-react'
import { usersDataFake } from "./KhoahocData";
import { getColor, getStatus, getColorCard_status, getCard_status, getData_synchronizing_status } from "./../../component/getBadge/GetBadge";

export const ScopeSlotsTable = (props) => {
    const history = useHistory()
    const [details, setDetails] = useState([]);
    const [danger, setDanger] = useState(false)
    // toogleDetails
    const toggleDetails = (index) => {
        const position = details.indexOf(index);
        let newDetails = details.slice();
        if (position !== -1) {
            newDetails.splice(position, 1);
        } else {
            newDetails = [...details, index];
        }
        setDetails(newDetails);
    };
    const redirectUser = (item) => {
        // console.log(item)
        history.push(`/users/${item.id}`)
    }
    console.log(props)
    return {
        ten_khoa_hoc: (item) => {
            return (
                <td onClick={() => redirectUser(props.item)}>
                    <CNavLink>{item ? item.ten_khoa_hoc : ''}</CNavLink>
                </td>
            )
        },
        hang_gplx: (item) => {
            return (
                <td>
                    {props.item ? props.item.hang_gplx : ''}
                </td>
            )
        },
        ngay_khai_giang: (item) => {
            return (
                <td>
                    <Moment format="DD/MM/YYYY">{props.item.ngay_khai_giang}</Moment>
                </td>
            )
        },
        status: (item) => {
            return (
                <td className="courses-status">
                    <CAlert className="px-2 py-0 mb-0 col-10 text-center m-auto" color={getColor(props.item.status)}>{getStatus(props.item.status)}</CAlert>
                </td>
            )
        },
        card_status: (item, index) => {
            return (
                <td className="courses-card_status">
                    <CAlert className="px-2 py-0 mb-0 col-10 text-center m-auto" color={getColorCard_status(props.item.card_status)}>{getCard_status(props.item.card_status)}</CAlert>
                </td>
            )
        },
        biometrics: (item, index) => {
            return (
                <td>
                    {
                        usersDataFake.find((itemFake) => itemFake.stt === props.index).biometrics.fingerprint
                    } <span className="pr-3 courses-icon"><CIcon name={'cil-fingerprint'} /></span>
                    {
                        usersDataFake.find((itemFake) => itemFake.stt === props.index).biometrics.fade_id
                    } <span className="courses-icon"><CIcon name={'cil-face'} /></span>
                </td>
            )
        },
        so_hoc_sinh: (item) => {
            return (
                <td>
                    {props.item ? props.item.so_hoc_sinh : ''}
                </td>
            )
        },
        data_synchronizing: (item, index) => {
            return (
                <td className="text-center">
                    <span className="pr-3">
                        <CAlert className="d-inline-flex p-2 mb-0" color={getData_synchronizing_status(usersDataFake.find((itemFake) => itemFake.stt === props.index).data_synchronizing)}>
                            <CIcon name={'cil-screen-smartphone'} />
                        </CAlert>
                    </span>
                    <span className="pr-3">
                        <CAlert className="d-inline-flex p-2 mb-0" color={"success"}>
                            <CIcon name={'cil-truck'} />
                        </CAlert>
                    </span>
                </td>
            )
        },
        theory: (item, index) => {
            return (
                <td>
                    {
                        usersDataFake.find((itemFake) => itemFake.stt === props.index).theory.number
                    } buổi
                    <br />
                    <span className="text-disable">
                        ({
                            usersDataFake.find((itemFake) => itemFake.stt === props.index).theory.start_theory
                        }h-
                        {
                            usersDataFake.find((itemFake) => itemFake.stt === props.index).theory.end_theory
                        }h/
                        {
                            usersDataFake.find((itemFake) => itemFake.stt === props.index).theory.sum
                        }h)
                    </span>
                </td>
            )
        },
        practise: (item, index) => {
            return (
                <td>
                    {
                        usersDataFake.find((itemFake) => itemFake.stt === props.index).practise.start_practise
                    }-
                    {
                        usersDataFake.find((itemFake) => itemFake.stt === props.index).practise.end_practise
                    }
                    <br />
                    <span className="text-disable">
                        /{
                            usersDataFake.find((itemFake) => itemFake.stt === props.index).practise.sum
                        }km
                    </span>
                </td>
            )
        },
        ngay_be_giang: (item) => {
            return (
                <td>
                    <Moment format="DD/MM/YYYY">{props.item.ngay_be_giang}</Moment>
                </td>
            )
        },
        delete_row: (item, index) => {
            return (
                <td className="align-middle py-2">
                    <span>
                        <CButton onClick={() => setDanger(!danger)} className="mr-2 p-0">
                            <CIcon name={'cil-trash'} />
                        </CButton>
                    </span>
                    <span>
                        <CButton onClick={() => toggleDetails(props.index)} className="p-0">
                            <CIcon name={'cil-caret-' + (details.includes(props.index) ? 'top' : 'bottom')} />
                        </CButton>
                    </span>
                </td>
            );
        },
        details: (item, index) => {
            return (
                <CCollapse show={details.includes(props.index)}>
                    <CCardBody>
                        <h4>{props.item.username}</h4>
                        <p className="text-muted">
                            User since: {props.item.registered}
                        </p>
                        <CButton size="sm" color="info">
                            User Settings
                        </CButton>
                        <CButton size="sm" color="danger" className="ml-1">
                            Delete
                        </CButton>
                    </CCardBody>
                </CCollapse>
            );
        },
    }
}