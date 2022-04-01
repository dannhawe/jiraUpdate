import { CLOSE_DRAWER, OPEN_DRAWER, SET_SUBMIT_DRAWER } from "../constants/DrawerContants"

const initialState = {
    visible: false,
    title: 'Drawer',
    callSubmit: () => { alert('Chó là milo') },
    Component: '',
}

export const DrawerAntReducer = (state = initialState, action) => {
    switch (action.type) {

        case OPEN_DRAWER: {
            return { ...state, visible: true, Component: action?.Component, title: action.title }
        }
        case CLOSE_DRAWER: {
            return { ...state, visible: false }
        }
        case SET_SUBMIT_DRAWER: {
            return { ...state, callSubmit: action.callSubmit }
        }

        default:
            return state
    }
}
