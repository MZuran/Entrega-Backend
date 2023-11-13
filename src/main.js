import {ProductManager} from "./productManager.js"
import express from "express"

const manager = new ProductManager('./files/productsExpanded.txt')
const app = express()

app.listen("5000", () => {
    console.log("Listening on port 5000")
})

app.get("/", (req, res) => {
    res.json({})
})

app.get("/productos", (req, res) => {
    const limit = parseInt(req.query.limit)

    if (!limit) {
        res.json(manager.getProducts())
    } else {
        res.json(manager.getProducts().slice(0, limit))
    }
})

app.get("/productos/:pid", (req, res) => {
    const {pid} = req.params
    res.json(manager.getProductById(parseInt(pid)))
})