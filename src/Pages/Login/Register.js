import React from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { userRegisterAction } from '../../Redux/action/UserRegisterAction';

function Register(props) {

    const {
        // values,
        errors,
        handleChange,
        handleSubmit,
    } = props;


    return (
        <div className="d-flex align-items-center justify-content-center login flex-column" style={{ height: '100%' }}>
            <div className="p-3 login-bg" style={{
                borderRadius: '10px',
                width: '300px'
            }}>
                <h1 className="text-center mb-5">REGISTER</h1>
                <Form
                    onSubmitCapture={handleSubmit}
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item>
                        <Input
                            onChange={handleChange}
                            name="email"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Email" />
                        <small className="text-white">{errors.email}</small>
                    </Form.Item>
                    <Form.Item>
                        <Input
                            onChange={handleChange}
                            name="passWord"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password"
                        />
                        <small className="text-white">{errors.passWord}</small>
                    </Form.Item>
                    <Form.Item>
                        <Input
                            onChange={handleChange}
                            name="phoneNumber"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Phone number"
                        />
                        <small className="text-white">{errors.phoneNumber}</small>
                    </Form.Item>

                    <Form.Item>
                        <Input
                            onChange={handleChange}
                            name="name"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Name"
                        />
                        <small className="text-white">{errors.name}</small>
                    </Form.Item>

                    <Form.Item className="mb-3">
                        <Button style={{ width: '100%', borderRadius: '50px' }} htmlType="submit" className="login-form-button">
                            Register
                        </Button>
                    </Form.Item>
                    Or <NavLink style={{ color: 'white', fontSize: '16px' }} to="/login">Login</NavLink>
                </Form>
            </div>
        </div>
    )
}
const phoneRegVN = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
const nameReg = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W]+$/;
const RegisterForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues(props) { // Init form field
        return {
            email: '',
            passWord: '',
            name: '',
            phoneNumber: ''
        }
    },
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(userRegisterAction(values))
    },
    validationSchema: Yup.object().shape({ // Validate form field
        email: Yup.string()
            .required('Email is required')
            .email('Email must be a valid email'),
        passWord: Yup.string()
            .required('Password is required')
            .min(4, 'Password must have min 4 characters')
            .max(32, 'Password have max 32 characters'),
        phoneNumber: Yup.string().required('Phone number is required').matches(phoneRegVN, 'Phone number is invalid'),
        name: Yup.string().required('Name is required').matches(nameReg, 'Name is invalid')
    }),
})(Register)

export default connect()(RegisterForm)
