export const getAuthToken = (state) => {
    return state.auth.token ? state.auth.token : localStorage.getItem('Token')
}