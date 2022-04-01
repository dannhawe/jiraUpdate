import { DELETE_USER_SAGA, EDIT_USER_SAGA, GET_LIST_USER, GET_LIST_USER_SAGA } from "../constants/ListUserConstants";

export const getUserListAction = (arrUser) => ({
    type: GET_LIST_USER,
    arrUser
})
export const getUserListActionSaga = (keyWord) => ({
    type: GET_LIST_USER_SAGA,
    keyWord
})
export const deleteUserSagaAction = (userId) => ({
    type: DELETE_USER_SAGA,
    userId
})
export const editUserSagaAction = (user) => ({
    type: EDIT_USER_SAGA,
    user
})