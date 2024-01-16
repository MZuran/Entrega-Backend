import express from "express"
import { manager } from "../main.js"
import { cartManager } from "../main.js"
import { parseQueryParams } from "../auxiliary functions/parseQuery.js"

const viewsRouter = express.Router()

viewsRouter.get('/test', (req, res) => {
    const testObject = {
        var1: "x"
    }
    res.render('index', testObject)
})

viewsRouter.post('/addSubmitForm', (req, res) => {
    const {title, description, code, price, status, stock, category, thumbnail} = req.body

    console.log("Submitted!", title)
})

viewsRouter.get('/', async (req, res) => {
    const queryObject = parseQueryParams(req)
    const productData = await manager.getAllProducts(queryObject)
    const sentObject = {productsArray: productData.docs, user: req.session.user}

    res.render('products', sentObject)
})

viewsRouter.get('/carts', async (req, res) => {
    let cartsArray = await cartManager.getAllCarts()
    let productsArray = []

    cartsArray.forEach(async cart => {
        cart.contents.forEach(async product => {
            product.details = await manager.getProductById(product.product_id)
        });
    })

    const sentObject = { cartsArray: cartsArray }
    res.render('carts', sentObject)
})

viewsRouter.get('/realTimeProducts', async (req, res) => {
    const sentObject = { productsArray: await manager.getAllProducts(req) }
    res.render('realTimeProducts', sentObject)
})

viewsRouter.get('/chat', async (req, res) => {
    res.render('chat')
})

export default viewsRouter