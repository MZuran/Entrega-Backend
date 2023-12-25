import express from "express"
import { manager } from "../main.js"

const handlebarsRouter = express.Router()

handlebarsRouter.get('/test', (req, res) => {
    const testObject = {
        var1: "x"
    }
    res.render('index', testObject)
})

handlebarsRouter.post('/addSubmitForm', (req, res) => {
    const {title, description, code, price, status, stock, category, thumbnail} = req.body

    console.log("Submitted!", title)
})

handlebarsRouter.get('/', async (req, res) => {
    const sentObject = { productsArray: await manager.getAllProducts() }
    res.render('home', sentObject)
})

handlebarsRouter.get('/realTimeProducts', async (req, res) => {
    const sentObject = { productsArray: await manager.getAllProducts() }
    res.render('realTimeProducts', sentObject)
})

export default handlebarsRouter