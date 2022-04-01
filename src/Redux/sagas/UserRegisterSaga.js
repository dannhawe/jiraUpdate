import { call, takeLatest } from "redux-saga/effects";
import { userRegisterServices } from "../../Services/UserRegisterServices";
import { STATUS_CODE } from "../../Util/constants/SettingSystems";
import { REGISTER_USER_SAGA } from "../constants/UserRegisterConstants";
import Swal from 'sweetalert2'
import { history } from "../../Util/libs/history";

function* userRegisterSaga(action) {
    try {
        const {  status } = yield call(() => userRegisterServices.postRegisterSaga(action.user))
        if (status === STATUS_CODE.SUCCESS) {
            Swal.fire({
                icon: 'success',
                title: 'Register is success',
                timer: 1000
            })
            history.push("/login")
        }
    } catch (err) {
        if (err.response?.data.statusCode === STATUS_CODE.INVALID) {
            Swal.fire({
                icon: 'error',
                title: 'Register is failed',
                text: `${err.response?.data.message}`,
                timer: 1000
            })
        }
    }
}

export function* followUserRegisterSaga() {
    yield takeLatest(REGISTER_USER_SAGA, userRegisterSaga)
}