import { GET_ALL_PROJECT, GET_PROJECT_CATEGORY } from "../constants/ProjectManagementConstants"

const initialState = {
    arrProject: [

    ],
    category: [],
}

export const ProjectManagementReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_PROJECT: {
            state.arrProject = action.arrProject.map((project, index) => {
                return { ...project, stt: index + 1, key: index + 1 }
            })
            return { ...state }
        }
        case GET_PROJECT_CATEGORY: {
            return { ...state, category: action.category }
        }


        default:
            return state
    }
}
