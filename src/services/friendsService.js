import axios from 'axios'

export function friendsService(){
    const token = localStorage.getItem('token')
    const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${token}`   
        }
    })

    const services = {
        async addFriend(friendId){
            return api.post(`friends/add/${friendId}`);
        },

        async removeFriend(friendId){
            return api.post(`friends/remove/${friendId}`);
        }
    }

    return services
}