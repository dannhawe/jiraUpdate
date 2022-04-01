import { takeLatest } from "@redux-saga/core/effects";
import { call, put } from "redux-saga/effects";
import { projectManagementService } from "../../Services/ProjectManagementService";
import { STATUS_CODE } from "../../Util/constants/SettingSystems";
import { getAllProjectAction, getAllProjectSagaAction, getProjectCategoryAction } from "../action/ProjectManagementAction";
import { ADD_USER_PROJECT_SAGA, CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT_SAGA, GET_PROJECT_CATEGORY_SAGA, REMOVE_USER_PROJECT_SAGA, UPDATE_PROJECT_SAGA } from "../constants/ProjectManagementConstants";
import Swal from 'sweetalert2'
import { history } from '../../Util/libs/history'

function* getAllProjectSaga(action) {
    try {
        const { data, status } = yield call(() => projectManagementService.getAllProject(action.keyword))
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getAllProjectAction(data.content))
        }
    } catch (err) {
    }
}

export function* followGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga)
}

function* getProjectCategorySaga() {
    try {

        const { data, status } = yield call(() => projectManagementService.getProjectCategory())
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getProjectCategoryAction(data.content))
        }
    } catch (err) {
    }
}

export function* followGetProjectCatagorySaga() {
    yield takeLatest(GET_PROJECT_CATEGORY_SAGA, getProjectCategorySaga)
}

function* createProjectSaga(action) {
    try {
        const { status } = yield call(() => projectManagementService.createProject(action.project))
        if (status === STATUS_CODE.SUCCESS) {
            Swal.fire({
                icon: 'success',
                title: 'Create Project is success',
                timer: 1000
            })
            history.push('/projectmanagement')
        }
    } catch (err) {
        console.log(err.response.data)
        Swal.fire({
            icon: 'error',
            title: 'Create Project is fail',
            text: `${err.response.data.content}`,
            timer: 1000
        })
    }
}

export function* followCreateProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga)
}


function* deleteProjectSaga(action) {
    try {

        const { status } = yield call(() => projectManagementService.deleteProject(action.projectId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getAllProjectSagaAction())
            Swal.fire({
                icon: 'success',
                title: 'Delete is success',
                timer: 1000
            })
        }
    } catch (err) {

        Swal.fire({
            icon: 'error',
            title: 'Delete is fail',
            timer: 1000
        })
    }
}

export function* followDeleteProjectSaga() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga)
}

function* updateProjectSaga(action) {
    try {
        const { status } = yield call(() => projectManagementService.updateProject(action.projectId, action.project))
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getAllProjectSagaAction())
            Swal.fire({
                icon: 'success',
                title: 'Update is success',
                timer: 1000
            })
        }
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Update is Fail',
            timer: 1000
        })
    }
}

export function* followUpdateProjectSaga() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga)
}

function* addUserProjectSaga(action) {
    try {
        const { status } = yield call(() => projectManagementService.addUserProject(action.user))
        if (status === STATUS_CODE.SUCCESS) {

            yield put(getAllProjectSagaAction())
            Swal.fire({
                icon: 'success',
                title: 'Add user is success',
                timer: 1000
            })
        }
    } catch (err) {

        Swal.fire({
            icon: 'error',
            title: 'Add user is Fail',
            text: `${err.response.data.message}`,
            timer: 1000
        })
    }
}

export function* followAddUserProjectSaga() {
    yield takeLatest(ADD_USER_PROJECT_SAGA, addUserProjectSaga)
}


function* removeUserProjectSaga(action) {
    try {
        const { status } = yield call(() => projectManagementService.removeUserProject(action.user))
        if (status === STATUS_CODE.SUCCESS) {

            yield put(getAllProjectSagaAction())
            Swal.fire({
                icon: 'success',
                title: 'Delete user is success',
                timer: 1000
            })
        }
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Delete user is Fail',
            text: `${err.response.data.message}`,
            timer: 1000
        })
    }
}

export function* followRemoveUserProjectSaga() {
    yield takeLatest(REMOVE_USER_PROJECT_SAGA, removeUserProjectSaga)
}