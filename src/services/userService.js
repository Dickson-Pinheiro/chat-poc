import axios from "axios"

export function userService(){
    const token = localStorage.getItem('token')
    const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const services = {
        async getUsers(){
            return api.get('/users')
        }
    }

    return services;
}