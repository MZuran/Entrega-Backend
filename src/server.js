import { Server } from "socket.io";
import { manager } from "./main.js";

export function initializeSocket(httpServer) {
    let io = new Server(httpServer);
  
    io.on('connection', async (socket) => {
    
        socket.on('connectedClient', (message) => {
            console.log('A client says', message);
        })
        
        socket.emit("products", await manager.getAllProducts())

        socket.on("addProduct", async (message) => {
            await manager.createProduct(message)
        })

        socket.on("deleteProduct", async (target) => { await manager.deleteProduct(target) })

    })
    return io;
  }