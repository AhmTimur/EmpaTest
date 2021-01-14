import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://emphasoft-test-assignment.herokuapp.com/',
})