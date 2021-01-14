import {instance} from "./api";


export const usersAPI = {
    getUsers(token) {
        const getToken = !!token ? token : localStorage.getItem('Token')
        return instance({
            method: 'get',
            url: 'api/v1/users/',
            headers: {Authorization: `Token ${getToken}`, accept: "application/json"}
        }).then(res => res.data).catch(error => console.log(error))
        }
}