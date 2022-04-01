import { BaseService } from './BaseService'

class ProjectManagementService extends BaseService {
    getAllProject = (keyword) => {
        if(keyword){
            return this.get(`/Project/getAllProject?keyword=${keyword}`)
        }
        return this.get(`/Project/getAllProject`)
    }
    getProjectCategory = () => {
        return this.get(`/ProjectCategory`)
    }
    createProject = (values) =>{
        return this.post(`/Project/createProjectAuthorize`,values)
    }
    deleteProject = (projectId) => {
        return this.delete(`/Project/deleteProject?projectId=${projectId}`)
    }
    updateProject = (projectId, project) => {
        return this.put(`/Project/updateProject?projectId=${projectId}`, project)
    }
    addUserProject = (user) => {
        return this.post(`/Project/assignUserProject`, user)
    }
    removeUserProject = (user) => {
        return this.post(`/Project/removeUserFromProject`, user)
    }
}

export const projectManagementService = new ProjectManagementService()
