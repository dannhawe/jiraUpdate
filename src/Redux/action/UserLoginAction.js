import { LOGIN, LOGIN_SAGA } from "../constants/UserLoginConstants";

export const LoginActionSaga = (user) => ({
    type: LOGIN_SAGA,
    user
})
export const LoginAction = (userLogin) => ({
    type: LOGIN,
    userLogin
})
