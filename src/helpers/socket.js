import { io } from 'socket.io-client'

// const ENDPOINT = 'http://localhost:5000/'
const ENDPOINT = " https://project-realtime-chatapp.herokuapp.com/";


export const socket = io(ENDPOINT)
export let socketID = ''
socket.on('connect', () => {
  socketID = socket.id
})