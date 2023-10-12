import { io } from 'socket.io-client';
export const socket = io("https://api.dicksonpinheiro.com.br", {
    autoConnect: false,
    transports: ['websocket']
});