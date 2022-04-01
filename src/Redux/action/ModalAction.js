import { CLOSE_MODAL, SET_SUBMIT_EDIT_USER_MODAL, SHOW_MODAL } from "../constants/ModalConstants";

export const showModalAction = (Component, title) => ({
    type: SHOW_MODAL,
    Component,
    title
})
export const closeModalAction = () => ({
    type: CLOSE_MODAL
})

export const submitEditUserModalActon = (callSubmit) => ({
    type: SET_SUBMIT_EDIT_USER_MODAL,
    callSubmit
})