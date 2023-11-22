import {ProductManager} from "./productManager.js"
import { CartsManager } from "./cartsManager.js"
import express from "express"

import productRouter from "./routes/products.js"
import cartRouter from "./routes/cart.js"

export const manager = new ProductManager('./files/productsJson.json')
export const cartManager = new CartsManager('./files/cartsJson.json')

const app = express()

app.use((req, res, next)=> {
    express.json()(req,res,next)
})

app.listen("8080", () => {
    console.log("Listening on port 8080")
})

app.use('/api/products', productRouter )
app.use('/api/carts', cartRouter )