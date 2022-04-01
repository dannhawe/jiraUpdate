import React, { useEffect } from 'react'
import { Form, Input } from 'antd';
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { connect, useDispatch } from 'react-redux'
import { GoogleOutlined, IdcardOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { closeModalAction, submitEditUserModalActon } from '../../Redux/action/ModalAction';
import { editUserSagaAction } from '../../Redux/action/UserManagementAction';

function EditUserForm(props) {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(submitEditUserModalActon(handleSubmit))
    }, [dispatch, handleSubmit])

    return (
        <>
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
                        name="id"
                        value={values.id}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="id"
                        disabled
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        onChange={handleChange}
                        name="email"
                        value={values.email}
                        prefix={<GoogleOutlined className="site-form-item-icon" />}
                        placeholder="Email" />
                    <small className="text-danger">{errors.email}</small>
                </Form.Item>
                <Form.Item>
                    <Input
                        onChange={handleChange}
                        value={values.phoneNumber}
                        name="phoneNumber"
                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                        placeholder="Phone number"
                    />
                    <small className="text-danger">{errors.phoneNumber}</small>
                </Form.Item>
                <Form.Item>
                    <Input
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        prefix={<IdcardOutlined className="site-form-item-icon" />}
                        placeholder="Name"
                    />
                    <small className="text-danger">{errors.name}</small>
                </Form.Item>
            </Form>
        </>
    )
}
const phoneRegVN = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
const nameReg = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W]+$/;
const EditUserFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues(props) {
        const { user } = props
        return {
            id: user.userId,
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber
        }
    },
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(closeModalAction())
        props.dispatch(editUserSagaAction(values))
    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email must be a valid email'),
        phoneNumber: Yup.string().required('Phone number is required').matches(phoneRegVN, 'Phone number is invalid'),
        name: Yup.string().required('Name is required').matches(nameReg, 'Name is invalid')
    }),
})(EditUserForm)


export default connect()(EditUserFormik)
