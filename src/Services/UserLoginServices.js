import { BaseService } from './BaseService'

class UserLoginServices extends BaseService {
    postLoginUser = (user) => {
        return this.post(`/Users/signin`, user)
    }

}

export const userLoginServices = new UserLoginServices()
