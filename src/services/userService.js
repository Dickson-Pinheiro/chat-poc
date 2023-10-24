import axios from "axios"

export function userService(){
    const token = localStorage.getItem('token')
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
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