import React, { useEffect, useRef } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { deleteUserSagaAction, getUserListActionSaga } from '../Redux/action/UserManagementAction';
import Search from 'antd/lib/transfer/search';
import { showModalAction } from '../Redux/action/ModalAction';
import EditUserForm from '../Component/Form/EditUserForm';




export default function UserManagement(props) {

    const { arrUser } = useSelector(state => state.listUserReducer);
    const dispatch = useDispatch()
    const searchRef = useRef(null)
    useEffect(() => {
        dispatch(getUserListActionSaga(''))
    }, [dispatch])


    const columns = [
        {
            title: 'Stt',
            dataIndex: 'stt',
            sorter: (item2, item1) => item2.stt - item1.stt,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (item2, item1) => item2.email.length - item1.email.length,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.toLowerCase() > b.name.toLowerCase(),
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return <div key={index} className="managerment">
                    <EditOutlined
                        onClick={() => {
                            dispatch(showModalAction(<EditUserForm user={record} />, 'Edit User'))
                        }}
                        className="icon-action bg-primary mr-2" />
                    <DeleteOutlined onClick={() => { dispatch(deleteUserSagaAction(record.userId)) }} className="icon-action" />
                </div>
            }
        },
    ];
    return (
        <>
            <h1>User management</h1>
            <div style={{ width: '100%' }} className="d-flex my-3">
                <Search placeholder="Search ..." onChange={(e) => {
                    if (searchRef.current) {
                        clearTimeout(searchRef.current)
                    }
                    searchRef.current = setTimeout(() => {
                        dispatch(getUserListActionSaga(e.target.value))
                    }, 300)

                }} />
            </div>
            <Table columns={columns} dataSource={arrUser} style={{ width: 'auto' }} />
        </>
    )
}
