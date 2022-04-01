import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../Util/constants/SettingSystems'
import { userLoginServices } from "../../Services/UserLoginServices";
import { LOGIN_SAGA} from "../constants/UserLoginConstants";
import { history } from '../../Util/libs/history'
import Swal from 'sweetalert2'
import { LoginAction } from "../action/UserLoginAction";

function* loginUserSaga(action) {
    try {

        const { data, status } = yield call(() => userLoginServices.postLoginUser(action.user))

        if (status === STATUS_CODE.SUCCESS) {
            localStorage.setItem(TOKEN, data.content.accessToken)
            localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))
            yield put(LoginAction(data.content))

            Swal.fire({
                icon: 'success',
                title: 'Login is success',
                timer: 1000
            })
            history.push("/usermanagement")
        }

    } catch (err) {
     
        if (err.response?.data.statusCode === STATUS_CODE.INVALID) {
            Swal.fire({
                icon: 'error',
                title: 'Login is failed',
                text: 'Email or Password invalid',
                timer: 1000
            })
        }
    }
}

export function* followLoginUser() {
    yield takeLatest(LOGIN_SAGA, loginUserSaga)
}

