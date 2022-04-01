import React from 'react'
import { NavLink } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { LoginActionSaga } from '../../Redux/action/UserLoginAction';


function Login(props) {

    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;

    return (
        <div className="d-flex align-items-center justify-content-center login flex-column" style={{ height: '100%' }}>
            <div className="p-3 login-bg" style={{
                borderRadius: '10px',
                width: '280px'
            }}>
                <h1 className="text-center mb-5">LOGIN</h1>
                <Form
                    onSubmitCapture={handleSubmit}
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item

                    >
                        <Input
                            name="email"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                            onChange={handleChange} />
                        <small className="form-text text-light">{errors.email}</small>
                    </Form.Item>
                    <Form.Item

                    >
                        <Input
                            name="passWord"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        <small className="form-text text-light">{errors.passWord}</small>
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item className="mb-3">
                        <Button style={{ width: '100%', borderRadius: '50px' }} htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                    <div className="text-center my-2">
                        <NavLink to="/">
                            <i className="fab fa-facebook-f icon"></i>
                        </NavLink>
                    </div>
                    Or <NavLink style={{ color: 'white', fontSize: '16px' }} to="/register">register now!</NavLink>
                </Form>
            </div>
        </div>
    )
}

const LoginForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues(props) { // Init form field
        return {
            email: '',
            passWord: ''
        }
    },
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(LoginActionSaga(values))
    },
    validationSchema: Yup.object().shape({ // Validate form field
        email: Yup.string()
            .required('Email is required')
            .email('Email must be a valid email'),
        passWord: Yup.string()
            .required('Password is required')
            .min(4, 'Password must have min 4 characters')
            .max(32, 'Password have max 32 characters')
    }),
})(Login)

export default connect()(LoginForm)