import { newCard } from "./newCard.js";
const socket = io()

console.log("Script Loaded")

const container = document.querySelector('#cardContainer')

socket.on('connect', () => {
    socket.emit('connectedClient', "Hello!");
})

socket.on('products', (data) => {
    let cards = ""
    data.forEach(element => {
        cards += newCard(element.category, element.thumbnail, element.title, element.price, element.description, element.stock)
    });
    container.innerHTML = cards
})

