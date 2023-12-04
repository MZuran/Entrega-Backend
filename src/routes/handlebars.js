import express from "express"
import { manager } from "../main.js"

const handlebarsRouter = express.Router()

handlebarsRouter.get('/test', (req, res) => {
    const testObject = {
        var1: "x"
    }
    res.render('index', testObject)
})

handlebarsRouter.get('/', (req, res) => {
    const sentObject = {
        productsArray: manager.getProducts()
    }
    res.render('home', sentObject)
})

handlebarsRouter.get('/realTimeProducts', (req, res) => {
    const sentObject = {
        productsArray: manager.getProducts()
    }
    res.render('realTimeProducts', sentObject)
})

export default handlebarsRouter