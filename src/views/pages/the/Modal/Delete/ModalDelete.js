import React, { useEffect } from 'react'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CSpinner,
    CModalTitle,
    CModalHeader,
    CToaster,
    CToast,
    CToastHeader,
    CToastBody,
} from '@coreui/react'
import { deleteRfcards, getRfcards } from 'src/services/rfcardsService'

const ModalDelete = (props) => {
    // console.log(props);
    const closeModal = () => {
        props.delete.setDeleteRow({ ...props.delete.deleteRow, on_off: false })
    }
    const onDeleteRow = (id) => {
        props.delete.setDeleteRow({ ...props.delete.deleteRow, disable: true, loading: true })
        async function deleteRfcard() {
            try {
                const del = await deleteRfcards(id);
                if (del.data.success === true) {
                    async function fetchRfcards() {
                        try {
                            const result = await getRfcards(props.delete.filter);
                            // console.log(result);
                            props.delete.setRfcards(result.data.items);
                            props.delete.setTotalpages(result.data.total)
                        } catch (error) {
                        }
                    }
                    fetchRfcards();
                    props.delete.callToast(`Xóa thành công thẻ ${props.delete.deleteRow.item.card_name}!`, 2)
                    props.delete.setDeleteRow({ ...props.delete.deleteRow, delData: del.data.success, on_off: false, loading: false })
                }
            } catch (error) {
                props.delete.callToast(`Xóa thẻ ${props.delete.deleteRow.item.card_name} không thành công!`, 3)
                props.delete.setDeleteRow({ ...props.delete.deleteRow, disable: false, loading: false })
            }
        }
        deleteRfcard()
    }
    return (
        <CModal
            show={props.delete.deleteRow.on_off}
            onClose={closeModal}
            color="danger"
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Xóa thẻ</CModalTitle>
            </CModalHeader>
            <CModalBody>Bạn có muốn xóa thẻ {props.delete.deleteRow.item && props.delete.deleteRow.item.card_name}</CModalBody>
            <CModalFooter>
                <CButton color="danger" onClick={() => onDeleteRow(props.delete.deleteRow.item && props.delete.deleteRow.item.id)} disabled={props.delete.deleteRow.disable}>
                    {props.delete.deleteRow.loading ? <CSpinner className="mr-2" component="span" size="sm" aria-hidden="true" style={{ marginBottom: "0.1rem" }} /> : ""}
                    Đồng ý
                </CButton>
                <CButton color="secondary" onClick={closeModal}>
                    Hủy
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ModalDelete