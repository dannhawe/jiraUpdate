import { CLOSE_MODAL, SET_SUBMIT_EDIT_USER_MODAL, SHOW_MODAL } from "../constants/ModalConstants"

const initialState = {
    isModalVisible: false,
    title: 'Modal',
    callSubmit: () => { },
    componentContentModal: '',

}

export const ModalAntReducer = (state = initialState, action) => {
    switch (action.type) {

        case SHOW_MODAL: {
            return { ...state, isModalVisible: true, componentContentModal: action?.Component, title: action?.title }
        }
        case CLOSE_MODAL: {
            return { ...state, isModalVisible: false }
        }
        case SET_SUBMIT_EDIT_USER_MODAL: {
            return { ...state, callSubmit: action.callSubmit }
        }

        default:
            return state
    }
}
