import React, { forwardRef, useEffect, useRef, useState } from 'react'
import {
    CButton,
    CCol,
    CFormGroup,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CInput,
    CLabel,
    CSpinner,
    CInputFile,
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CDataTable,
    CListGroup,
    CListGroupItem,
    CFade,
    CLink,
    CInputCheckbox,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ModalAdd from './Add/ModalAdd'
import ModalDelete from './Delete/ModalDelete'
import ModalData_synchronizing from './Sync/ModalSync'

const KhoahocModal = (props) => {
    return (
        <>
            <ModalAdd
                add={{ props }}
            />
            <ModalDelete
                delete={{ props }}
            />
            <ModalData_synchronizing
                sync={{ props }}
            />
        </>
    )
}

export default KhoahocModal