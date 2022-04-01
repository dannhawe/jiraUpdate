import React from 'react'
import { Drawer, Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawerAction } from '../Redux/action/DrawerAction';

export default function DrawerAnt() {

    const { visible, title, callSubmit, Component } = useSelector(state => state.DrawerAntReducer)
    const dispatch = useDispatch()

    return (
        <>
            <Drawer
                title={title}
                placement="right"
                onClose={() => { dispatch(closeDrawerAction()) }}
                visible={visible}
                width={700}
                footer={
                    <Space>
                        <Button
                            onClick={() => { dispatch(closeDrawerAction()) }}
                        >
                            Cancel
                        </Button>
                        <Button type="primary" onClick={callSubmit}>
                            OK
                        </Button>
                    </Space>
                }
            >
                {Component}
            </Drawer>
        </>
    )
}
