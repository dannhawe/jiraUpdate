import { GET_LIST_USER } from "../constants/ListUserConstants"

const initialState = {
    arrUser: [

    ]
}

export const listUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_USER: {
            //add vào thuộc tính key,stt cho table của ant
            return {
                ...state, arrUser: action.arrUser.map((user, index) => (
                    { ...user, key: index, stt: index + 1 }
                ))
            }
        }

        default:
            return state
    }
}
