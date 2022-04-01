import React from 'react'
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction } from '../Redux/action/ModalAction';

export default function ModalAnt() {

    const { isModalVisible, callSubmit, componentContentModal, title } = useSelector(state => state.ModalAntReducer)

    const dispatch = useDispatch()

    return (
        <>
            <Modal
                title={title}
                visible={isModalVisible}
                onOk={() => {
                    callSubmit()
                }}
                onCancel={() => {
                    dispatch(closeModalAction())
                }}
            >
                {componentContentModal}
            </Modal>
        </>
    )
}
