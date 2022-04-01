import React, { useEffect } from 'react'
import { Form, Input, Select } from 'antd';
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { connect, useDispatch, useSelector } from 'react-redux'
import { closeDrawerAction, setSubmitDrawerAction } from '../../Redux/action/DrawerAction';
import { Editor } from '@tinymce/tinymce-react';
import { getProjectCategorySagaAction, updateProjectSagaAction } from '../../Redux/action/ProjectManagementAction';

const { Option } = Select;

function EditProjectForm(props) {
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
        dispatch(setSubmitDrawerAction(handleSubmit))
        dispatch(getProjectCategorySagaAction())
    }, [dispatch, handleSubmit])

    return (
        <>
            <Form
                onSubmitCapture={handleSubmit}
                layout="vertical"
            >
                <div className="container - fluid">
                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                label="Id"
                            >
                                <Input
                                    value={values.id}
                                    name="id"
                                    disabled
                                />
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                label="Project name"
                            >
                                <Input
                                    value={values.projectName}
                                    name="projectName"
                                    onChange={handleChange} />
                                <small className="text-danger">{errors.projectName}</small>
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                label="Creator"
                            >
                                <Input
                                    disabled
                                    value={props.project.creator.name}
                                    name="creator"
                                />
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
                                    value={values.description}
                                    init={{
                                        height: 250,
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
                            </Form.Item>
                        </div>
                    </div>
                </div>





            </Form>
        </>
    )
}


const EditProjectFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues(props) {
        const { project } = props
        console.log('project', project)
        return {
            id: project.id,
            projectName: project.projectName,
            creator: project.creator.id,
            description: project.description,
            categoryId: project.categoryId
        }
    },
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(updateProjectSagaAction(props.project.id, values))
        props.dispatch(closeDrawerAction())
    },
    validationSchema: Yup.object().shape({
        projectName: Yup.string().required('Project name is required'),
    }),
})(EditProjectForm)


export default connect()(EditProjectFormik)
