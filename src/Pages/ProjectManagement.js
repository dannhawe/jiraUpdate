import React, { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Popover, Table, AutoComplete, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addUserProjectSagaAction, deleteProjectSagaAction, getAllProjectSagaAction, removeUserProjectSagaAction } from '../Redux/action/ProjectManagementAction';
import ReactHtmlParser from 'react-html-parser'
import { openDrawerAction } from '../Redux/action/DrawerAction';
import EditProject from '../Component/Form/EditProject';
import Search from 'antd/lib/transfer/search';
import { getUserListActionSaga } from '../Redux/action/UserManagementAction';



export default function ProjectManagement() {

    const searchRef = useRef(null)

    const { arrProject } = useSelector(state => state.ProjectManagementReducer)


    const { arrUser } = useSelector(state => state.listUserReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProjectSagaAction())
    }, [dispatch])

    const [value, setValue] = useState()


    const renderSearchUser = (record) => {
        return <AutoComplete
            dropdownMatchSelectWidth={252}
            value={value}
            style={{
                width: 300,
            }}
            options={
                //lọc ra user chưa có trong danh sách project hiện tại
                arrUser?.filter(user => {
                    let index = record.members?.findIndex(member => member.userId === user.userId)
                    if (index !== -1) {
                        return false
                    }
                    return true
                }).map((user, index) => {
                    return { value: user.userId.toString(), label: user.name }
                })
            }
            onChange={(value) => {
                setValue(value)
            }}
            onSelect={(value, option) => {
                dispatch(addUserProjectSagaAction({
                    userId: value,
                    projectId: record.id
                }))
                setValue('')
            }}
            onSearch={(value) => {
                if (searchRef.current) {
                    clearTimeout(searchRef.current)
                }
                searchRef.current = setTimeout(() => {
                    dispatch(getUserListActionSaga(value))
                }, 300)
            }}
        >
            <Input.Search size="large" placeholder="input here" enterButton />
        </AutoComplete>
    }
    // data của table danh sách member trong project
    const columnsUserProject = [
        {
            title: 'Stt',
            dataIndex: 'stt',
        },
        {
            title: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Avatar',
            render: (text, record, index) => {
                return <img style={{ width: '40px', height: '40px', borderRadius: '50%' }} src={record.avatar} alt={record.avatar} key={index} />
            }
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return <div key={index} className="managerment">
                    <DeleteOutlined
                        onClick={() => {
                            dispatch(removeUserProjectSagaAction({
                                userId: record.userId,
                                projectId: record.projectId
                            }))
                        }}
                        className="icon-action" />
                </div>
            }
        },
    ]

    // data của danh sách project
    const columns = [
        {
            title: 'Stt',
            dataIndex: 'stt',
            sorter: (item2, item1) => item2.stt - item1.stt,
        },
        {
            title: 'projectId',
            render: (text, record, index) => {
                return record.id
            },
            sorter: (item2, item1) => item2.id - item1.id,
        },
        {
            title: 'Project name',
            dataIndex: 'projectName',
            sorter: (item2, item1) => item2.projectName.length - item1.projectName.length,
        },
        {
            title: 'Creator',
            render: (text, record, index) => {
                return record.creator.name
            },
            sorter: (a, b) => a.creator.name.toLowerCase() > b.creator.name.toLowerCase(),
        },
        {
            title: 'Member',
            render: (text, record, index) => {
                return <div key={index}>
                    <Popover
                        content={() => <Table
                            columns={columnsUserProject} dataSource={record.members.map((user, index) => {
                                return { ...user, stt: index += 1, key: index += 1, projectId: record.id }
                            })}
                            style={{ width: '500px' }} pagination={{ pageSize: 50 }} scroll={{ y: 240 }}
                        />}
                        title={(record.projectName)}
                    >
                        {
                            record.members.map((user, index) => {
                                if (index < 3) {
                                    return <img style={{ width: '40px', height: '40px', borderRadius: '50%' }} src={user.avatar} alt={user.avatar} key={index} />
                                }
                                if (index === 4) {
                                    return <span key={index} style={{ width: '40px', height: '40px' }} className="ant-avatar ant-avatar-circle">...</span>
                                }
                                return ''
                            })
                        }
                    </Popover >
                    {
                        < Popover placement="rightTop" title='Add user' content={renderSearchUser(record)} trigger="click" >
                            <Button className="btn" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#D3D3D3' }}>+</Button>
                        </Popover >
                    }
                </div >
            },

        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
        },
        {
            title: 'description',
            render: (text, record, index) => {
                return ReactHtmlParser(record.description)
            }
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return <div key={index} className="managerment">
                    <EditOutlined
                        onClick={() => {
                            dispatch(openDrawerAction(<EditProject project={record} />, 'Edit Project'))
                        }}
                        className="icon-action bg-primary mr-2" />
                    <DeleteOutlined
                        onClick={() => {
                            dispatch(deleteProjectSagaAction(record.id))
                        }}
                        className="icon-action" />
                </div>
            }
        },
    ];

    return (
        <div>
            <div style={{ width: '100%' }} className="d-flex my-3">
                <Search placeholder="Search ..." onChange={(e) => {
                    if (searchRef.current) {
                        clearTimeout(searchRef.current)
                    }
                    searchRef.current = setTimeout(() => {
                        dispatch(getAllProjectSagaAction(e.target.value))
                    }, 300)

                }} />
            </div>
            <Table columns={columns} dataSource={arrProject} style={{ width: 'auto' }} />
        </div>
    )
}
