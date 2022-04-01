import { CLOSE_DRAWER, OPEN_DRAWER, SET_SUBMIT_DRAWER } from "../constants/DrawerContants";

export const openDrawerAction = (Component, title) => ({
    type: OPEN_DRAWER,
    Component,
    title
})
export const closeDrawerAction = () => ({
    type: CLOSE_DRAWER
})
export const setSubmitDrawerAction = (callSubmit) => ({
    type: SET_SUBMIT_DRAWER,
    callSubmit
})
