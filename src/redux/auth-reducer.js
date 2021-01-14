import {API_TOKEN_AUTH} from "../api/auth-api";

const initialState = {
    token: '',
    isAuth: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_TOKEN_AUTH:
            return {
                ...state,
                token: action.payload.token,
                isAuth: true
            };
        default:
            return state;
    }
}

