import { call, put, takeLatest } from "redux-saga/effects";
import { userService } from "../../Services/UserService";
import { STATUS_CODE } from "../../Util/constants/SettingSystems";
import { getUserListAction, getUserListActionSaga } from "../action/UserManagementAction";
import { DELETE_USER_SAGA, EDIT_USER_SAGA, GET_LIST_USER_SAGA } from "../constants/ListUserConstants";
import Swal from 'sweetalert2'

function* getuserListSaga(action) {
    try {

        const { data, status } = yield call(() => userService.getUserList(action.keyWord))
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getUserListAction(data.content))
        }

    } catch (err) {
    }
}

export function* followUserListSaga() {
    yield takeLatest(GET_LIST_USER_SAGA, getuserListSaga)
}

function* deleteUserSaga(action) {
    try {

        const {  status } = yield call(() => userService.deleteUser(action.userId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getUserListActionSaga(''))
            Swal.fire({
                icon: 'success',
                title: 'Delete user is success',
                timer: 1000
            })
        }

    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: `${err.response?.data.content}`,
            timer: 1000
        })
    }
}

export function* followDeleteUserSaga() {
    yield takeLatest(DELETE_USER_SAGA, deleteUserSaga)
}

function* editUserSaga(action) {
    try {
        const { status } = yield call(() => userService.editUser(action.user))
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getUserListActionSaga(''))
            Swal.fire({
                icon: 'success',
                title: 'Edit user is success',
                timer: 1000
            })
        }

    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: `Delete user is fail`,
            text: `${err.response?.data.content}`,
            timer: 1000
        })
    }
}

export function* followEditUserSagaa() {
    yield takeLatest(EDIT_USER_SAGA, editUserSaga)
}

