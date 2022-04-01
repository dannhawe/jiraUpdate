
import { BaseService } from './BaseService'

class UserService extends BaseService {
    getUserList = (keyWord) => {
        return this.get(`/Users/getUser?keyword=${keyWord}`)
    }
    deleteUser = (userId) => {
        return this.delete(`/Users/deleteUser?id=${userId}`)
    }
    editUser = (user) => {
        return this.put(`/Users/editUser`, user)
    }
}

export const userService = new UserService()
