import { all } from 'redux-saga/effects'

import * as UserLoginSaga from './UserLoginSaga'
import * as UserRegisterSaga from './UserRegisterSaga'
import * as UserListSaga from './UserListSaga'
import * as ProjectManagement from './ProjectManagementSaga'



export function* rootSaga() {
    yield all([
        UserLoginSaga.followLoginUser(),
        UserRegisterSaga.followUserRegisterSaga(),
        UserListSaga.followUserListSaga(),
        UserListSaga.followDeleteUserSaga(),
        UserListSaga.followEditUserSagaa(),
        ProjectManagement.followGetAllProjectSaga(),
        ProjectManagement.followDeleteProjectSaga(),
        ProjectManagement.followGetProjectCatagorySaga(),
        ProjectManagement.followUpdateProjectSaga(),
        ProjectManagement.followAddUserProjectSaga(),
        ProjectManagement.followRemoveUserProjectSaga(),
        ProjectManagement.followCreateProjectSaga(),
    ])
}