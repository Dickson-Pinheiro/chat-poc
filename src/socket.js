import { io } from 'socket.io-client';
export const socket = io("https://chat-backend-vge7.onrender.com", {
    autoConnect: false,
    transports: ['websocket']
});