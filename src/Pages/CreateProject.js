import React, { useEffect } from 'react'
import {  Form, Input, Select } from 'antd';
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react';
import { createProjectSagaAction, getProjectCategorySagaAction } from '../Redux/action/ProjectManagementAction';

const { Option } = Select;

function CreateProject(props) {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = props;

    const { category } = useSelector(state => state.ProjectManagementReducer)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjectCategorySagaAction())
    }, [dispatch, handleSubmit])

    return (
        <>
            <Form
                onSubmitCapture={handleSubmit}
                layout="vertical"
            >
                <div className="container - fluid">
                    <h1>Create Project</h1>
                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                label="Project name"
                            >
                                <Input
                                    name="projectName"
                                    onChange={handleChange} />
                                <small className="text-danger">{errors.projectName}</small>
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                label="Category"
                            >
                                <Select name="categoryId" value={values.categoryId} onChange={(value) => { setFieldValue('categoryId', value) }}>
                                    {category?.map((item, index) => {
                                        return <Option
                                            key={index}
                                            value={item.id}
                                        >
                                            {item.projectCategoryName}
                                        </Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="col-12">
                            <Form.Item
                                label="Description"
                            >
                                <Editor
                                    init={{
                                        height: 400,
                                        menubar: true,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | fontsizeselect | formatselect | ' +
                                            'bold italic backcolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                    onEditorChange={(content, editor) => {
                                        setFieldValue('description', content)
                                    }}
                                />
                                <button type="submit" onClick={handleSubmit} className="btn btn-success mt-2">Create</button>
                            </Form.Item>
                        </div>

                    </div>
                </div>





            </Form>
        </>
    )
}


const CreateProjectFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues(props) {
        return {
            projectName: '',
            categoryId: props.category[0]?.id,
            description: ''
        }
    },
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(createProjectSagaAction(values))
    },
    validationSchema: Yup.object().shape({
        projectName: Yup.string().required('Project name is required'),
    }),
})(CreateProject)

const mapStateToProps = state => {
    return {
        category: state.ProjectManagementReducer.category
    }
}

export default connect(mapStateToProps)(CreateProjectFormik)
