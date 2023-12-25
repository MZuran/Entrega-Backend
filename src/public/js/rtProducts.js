import { newCard } from "./newCard.js";
import { productForm } from "./productForm.js";
const socket = io()

console.log("Script Loaded")

//WebSocket Code (Outdated)
const container = document.querySelector('#cardContainer')
let submitButton
let deleteButton

socket.on('connect', () => {
    socket.emit('connectedClient', "Hello!");
})

socket.on('products', (data) => {
    let cards = ""
    data.forEach(element => {
        cards += newCard(element)
    });
    console.log("My data is", data)

    container.innerHTML = cards + productForm()

    submitButton = document.querySelector('#formSubmit')
    deleteButton = document.querySelector('#formDelete')

    submitButton.addEventListener('click', () => { submitButtonClickEvent() })

    deleteButton.addEventListener('click', () => { deleteButtonClickEvent() })
})

socket.on('errorAddingProduct', (data) => { Swal.fire({ title: 'Error!', text: data, icon: 'error' }) })

function deleteButtonClickEvent() {
    let target = document.getElementById("formDeleteId").value

    if (!target) {
        Swal.fire({ title: 'Error!', text: "Please fill all the fields!", icon: 'error' })
        return
    }

    socket.emit('deleteProduct', target)
}

function submitButtonClickEvent() {
    let title = document.getElementById("formTitle").value;
    let description = document.getElementById("formDesc").value;
    let price = document.getElementById("formPrice").value;
    let thumbnail = document.getElementById("formThumbnail").value;
    let stock = document.getElementById("formStock").value;
    let category = document.getElementById("formCategory").value;
    let code = document.getElementById("formCode").value;

    let status = true

    if (!title || !description || !price || !thumbnail || !stock || !category || !code) {
        Swal.fire({ title: 'Error!', text: "Please fill all the fields!", icon: 'error' })
        return
    }

    socket.emit('addProduct', {title, description, price, thumbnail, code, stock, status, category})
}
