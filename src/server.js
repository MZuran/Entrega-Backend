import { Server } from "socket.io";
import { manager } from "./main.js";

export function initializeSocket(httpServer) {
    let io = new Server(httpServer);
  
    io.on('connection', (socket) => {
    
        socket.on('connectedClient', (message) => {
            console.log('A client says', message);
        })
        
        socket.emit("products", manager.getProducts())

        socket.on("addProduct", (message) => {
            manager.addProductRawObject(message)
            if (manager.errorMessage) { socket.emit("errorAddingProduct", manager.errorMessage) }
        })

        socket.on("deleteProduct", (target) => { manager.deleteProduct(parseInt(target)) })

    })
    return io;
  }