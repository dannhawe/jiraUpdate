import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router'
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    OrderedListOutlined,
    PlusOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { TOKEN, USER_LOGIN } from '../../Util/constants/SettingSystems';
import { LoginAction } from '../../Redux/action/UserLoginAction';

const { Header, Content, Footer, Sider } = Layout;

export default function UserManagementTemplates(props) {
    const { Component, ...resRoute } = props
    const [collapsed, setState] = useState(false)
    const { userLogin } = useSelector(state => state.UserLoginReducer)
    const dispatch = useDispatch()
    const onCollapse = collapsed => {
        setState(collapsed);
    };

    const [key, setKey] = useState('');

    useEffect(() => {
        const setSelectdKeys = () => {
            if (props.path === '/cyberBord') {
                setKey('1')
            }
            else if (props.path === '/projectmanagement') {
                setKey('2')
            }
            else if (props.path === '/createproject') {
                setKey('3')
            }
            else if (props.path === '/usermanagement') {
                setKey('4')
            } else {
                setKey('1')
            }
        }
        setSelectdKeys()
    }, [props.path])



    if (localStorage.getItem(USER_LOGIN)) {
        return (
            <Route {...resRoute} render={(propsRoute) => {
                return <>
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                            <div className="logo"></div>
                            <Menu theme="dark" selectedKeys={key} mode="inline">
                                <Menu.Item key="1" icon={<DesktopOutlined />}>
                                    <NavLink to="/cyberBord">Cyber Board</NavLink>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<OrderedListOutlined />}>
                                    <NavLink to="/projectmanagement"> Project management</NavLink>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<PlusOutlined />}>
                                    <NavLink to="/createproject">Create project</NavLink>
                                </Menu.Item>
                                <Menu.Item key="4" icon={<UserOutlined />}>
                                    <NavLink to="/usermanagement">User management</NavLink>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout className="site-layout">
                            <Header className="bg-light px-4">
                                <div className="d-flex justify-content-end align-items-center h-100">
                                    <p className="mb-0 mr-2" style={{ fontSize: '18px' }}>Xin chào! {userLogin?.name}</p>
                                    <div className="dropdown" >
                                        <img id="dropdownMenuLink" data-toggle="dropdown" style={{ borderRadius: '50%', height: '50px', cursor: 'pointer' }} src={userLogin?.avatar} alt={userLogin?.avatar} />
                                        <div className="dropdown-menu text-center p-0" style={{ height: '50px', minWidth: '100px' }}>
                                            <NavLink
                                                onClick={() => {
                                                    localStorage.removeItem(TOKEN)
                                                    localStorage.removeItem(USER_LOGIN)
                                                    dispatch(LoginAction(''))
                                                }}
                                                className="dropdown-item d-flex justify-content-center align-items-center p-0 m-0" style={{ height: '50px', minWidth: '100px' }} to="/login">
                                                <span style={{ height: '50px', lineHeight: '50px' }}>Logout</span>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </Header>
                            <Content style={{ margin: '0 16px' }}>
                                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                    <Component {...propsRoute} />
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'right' }}>Ant Design ©2021 Created by Nguyễn Văn Vũ Đức</Footer>
                        </Layout>
                    </Layout >
                </>

            }}>
            </Route>
        )
    } else {
        return <Redirect to="/login" />
    }
}
