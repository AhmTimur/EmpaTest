import {API_TOKEN_AUTH, LOG_OUT, TOGGLE_IS_FETCHING} from '../api/auth-api'

const initialState = {
    token: '',
    isAuth: false,
    isFetching: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_TOKEN_AUTH:
            return {
                ...state,
                token: action.payload.token,
                isAuth: true
            }
        case LOG_OUT:
            localStorage.removeItem('Token')
            return {
                ...state,
                isAuth: false,
                token: ''
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}

export const logOut = () => ({
    type: LOG_OUT
})

export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING, isFetching
})


