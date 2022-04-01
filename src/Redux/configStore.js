import { combineReducers, createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
//middleware saga
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from '../Redux/sagas/rootSaga';
import { UserLoginReducer } from './reducers/UserLoginReducer';
import { listUserReducer } from './reducers/ListUserReducer';
import { ModalAntReducer } from './reducers/ModalAntReducer';
import { ProjectManagementReducer } from './reducers/ProjectManagementReducer';
import { DrawerAntReducer } from './reducers/DrawerAntReducer';








const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    UserLoginReducer,
    listUserReducer,
    ModalAntReducer,
    ProjectManagementReducer,
    DrawerAntReducer
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));

middleWareSaga.run(rootSaga);

export default store;
