import {usersAPI} from '../api/users-api'
import {sortOptions, filterOptions} from '../constants/constants'

export const SET_USERS = 'SET_USERS'
export const CHANGE_USERS_ARRAY = 'CHANGE_USERS_ARRAY'

const initialValues = {
    users: [],
    usersArray: []
}

export const usersReducer = (state = initialValues, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                usersArray: action.users,
                users: action.users
            }
        case CHANGE_USERS_ARRAY:
            let filteredUsers = state.users
            if (action.filter.length > 0) {
                if (action.filterType === filterOptions.username) {
                    filteredUsers = state.users.filter(x => x.username.includes(action.filter))
                } else if (action.filterType === filterOptions.id) {
                    filteredUsers = state.users.filter(x => x.id.toString().indexOf(action.filter.toString()) > -1)
                }
            }
            if (action.sortType === sortOptions.increaseId) {
                filteredUsers = filteredUsers.slice().sort((a, b) => {
                    return a.id - b.id
                })
            } else if (action.sortType === sortOptions.decreaseId) {
                filteredUsers = filteredUsers.slice().sort((a, b) => {
                    return b.id - a.id
                })
            }
            return {
                ...state,
                usersArray: filteredUsers
            }
        default:
            return state
    }

}

export const setUsers = (users) => ({
    type: SET_USERS, users
})

export const filterUsers = (filter, filterType, sortType) => ({
    type: CHANGE_USERS_ARRAY, filter, filterType, sortType
})

export const usersRequest = (token) => async (dispatch) => {
    let data = await usersAPI.getUsers(token)
    dispatch(setUsers(data))
}