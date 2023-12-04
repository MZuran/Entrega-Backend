import { Server } from "socket.io";
import { manager } from "./main.js";

export function initializeSocket(httpServer) {
    let io = new Server(httpServer);
  
    io.on('connection', (socket) => {
    
        socket.on('connectedClient', (message) => {
            console.log('A client says', message);
        })
        
        socket.emit("products", manager.getProducts())

    })
    return io;
  }