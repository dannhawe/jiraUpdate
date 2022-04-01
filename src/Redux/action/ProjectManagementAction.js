import { ADD_USER_PROJECT_SAGA, CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA, GET_PROJECT_CATEGORY, GET_PROJECT_CATEGORY_SAGA, REMOVE_USER_PROJECT_SAGA, UPDATE_PROJECT_SAGA } from "../constants/ProjectManagementConstants";

export const getAllProjectAction = (arrProject) => ({
    type: GET_ALL_PROJECT,
    arrProject
})

export const getAllProjectSagaAction = (keyword) => ({
    type: GET_ALL_PROJECT_SAGA,
    keyword
})

export const getProjectCategorySagaAction = () => ({
    type: GET_PROJECT_CATEGORY_SAGA
})

export const getProjectCategoryAction = (category) => ({
    type: GET_PROJECT_CATEGORY,
    category
})
export const createProjectSagaAction = (project) => ({
    type: CREATE_PROJECT_SAGA,
    project
})

export const deleteProjectSagaAction = (projectId) => ({
    type: DELETE_PROJECT_SAGA,
    projectId
})

export const updateProjectSagaAction = (projectId, project) => ({
    type: UPDATE_PROJECT_SAGA,
    projectId,
    project
})

export const addUserProjectSagaAction = (user) => ({
    type: ADD_USER_PROJECT_SAGA,
    user
})
export const removeUserProjectSagaAction = (user) => ({
    type: REMOVE_USER_PROJECT_SAGA,
    user
})

