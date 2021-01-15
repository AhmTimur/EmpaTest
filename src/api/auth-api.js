import {instance} from './api'

export const API_TOKEN_AUTH = 'API_TOKEN_AUTH'
export const LOG_OUT = 'LOG_OUT'
export const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

export const authToken = (username, password) => {
    return (dispatch) => {instance.post(`api-token-auth/`, {username, password})
        .then((res) => {localStorage.setItem('Token', res.data.token)
                        dispatch({type: API_TOKEN_AUTH, payload: res.data})
        })}
}

