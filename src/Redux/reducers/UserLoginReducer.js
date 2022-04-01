import { USER_LOGIN } from "../../Util/constants/SettingSystems"
import { LOGIN } from "../constants/UserLoginConstants";

let userLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}
const initialState = {
    userLogin
}

export const UserLoginReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN:
            return { ...state, userLogin: action.userLogin }

        default:
            return state
    }
}
