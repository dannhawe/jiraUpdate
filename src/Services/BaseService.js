import Axios from 'axios'
import { DOMAIN, TOKEN } from '../Util/constants/SettingSystems'

export class BaseService {
    get = (url) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) },
        })
    }
    put = (url, mode) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: "PUT",
            data: mode,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) },
        })
    }
    post = (url, mode) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: "POST",
            data: mode,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) },
        })
    }
    delete = (url) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: "DELETE",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) },
        })
    }
}