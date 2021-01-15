import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://fathomless-ocean-00302.herokuapp.com/http://emphasoft-test-assignment.herokuapp.com',
})