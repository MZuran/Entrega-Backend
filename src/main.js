import express from "express"

import handlebars from 'express-handlebars'
import _dirname from "./utils.js";
import handlebarsRouter from "./routes/handlebars.js";

import productRouter from "./routes/products.js"
import cartRouter from "./routes/cart.js"

import mongoose from "mongoose";

import { initializeSocket } from "./server.js";

import productDao from "./dao/dbManager/product.dao.js";

//Initialize App
const app = express()

app.use((req, res, next)=> { express.json()(req,res,next) })
app.use(express.urlencoded({extended: true}))

const httpServer = app.listen("8080", () => {
    console.log("Listening on port 8080")
})

//HandleBars
app.engine("handlebars", handlebars.engine())
app.set('views', _dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static(_dirname + '/public'))

app.use('/', handlebarsRouter)

//Web Socket
const io = initializeSocket(httpServer)

//MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
.then(() => console.log("Connected to Database"))
.catch((err) => console.log(err))

//Data Access Objects
export const manager = new productDao()

//Api
app.use('/api/products', productRouter )
//app.use('/api/carts', cartRouter )


//Outdated
/*
export const manager = new ProductManager('./files/productsJson.json')
export const cartManager = new CartsManager('./files/cartsJson.json')
*/