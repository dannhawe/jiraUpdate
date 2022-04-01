import { REGISTER_USER_SAGA } from "../constants/UserRegisterConstants";

export const userRegisterAction = (user) => ({
    type: REGISTER_USER_SAGA,
    user: user
})
