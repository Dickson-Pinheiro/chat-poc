import axios from 'axios';

export function authService(){
    const token = localStorage.getItem('token')
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            Authorization: `Bearer ${token}`   
        }
    })    
    const services = {
        async login(email, password){
            return api.post('/login', {email, password})
        },

        async signup(email, password, name){
            return api.post('/signup', {email, password, name})
        }
    }

    return services;
}