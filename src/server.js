import { Server } from "socket.io";
import { manager } from "./main.js";
import { chatManager } from "./main.js";

export function initializeSocket(httpServer) {
    let io = new Server(httpServer);
  
    io.on('connection', async (socket) => {
    
        socket.on('connectedClient', (message) => {
            console.log('A client says', message);
        })
        
        socket.emit("messages", await chatManager.getAllMessages())

        socket.emit("products", await manager.getAllProducts())

        socket.on("addProduct", async (message) => {
            await manager.createProduct(message)
        })

        socket.on("deleteProduct", async (target) => { await manager.deleteProduct(target) })

        socket.on("messageSent", async (message) => {
            //console.log("Trying to send this message", message)
            await chatManager.createMessage(message)
            socket.emit("messages", await chatManager.getAllMessages())
        })

    })

    
    return io;
  }