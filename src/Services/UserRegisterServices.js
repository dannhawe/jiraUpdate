import { BaseService } from './BaseService'

class UserRegisterServices extends BaseService {
    postRegisterSaga = (user) => {
        return this.post(`/Users/signup`, user)
    }
}

export const userRegisterServices = new UserRegisterServices()
