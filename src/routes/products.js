import express from "express"
import { manager } from "../main.js";

import { checkObjectValues } from "../auxiliary functions/checkObjectValues.js";

const productRouter = express.Router()

productRouter.get("/", (req, res) => {
    const limit = parseInt(req.query.limit)

    if (!limit) {
        res.json(manager.getProducts())
    } else {
        res.json(manager.getProducts().slice(0, limit))
    }
})

productRouter.get("/:pid", (req, res) => {
    const {pid} = req.params
    res.json(manager.getProductById(parseInt(pid)))
})

productRouter.post('/', function (req, res) {
    const {title, description, code, price, status, stock, category, thumbnail} = req.body
    const newProduct = {title, description, code, price, status, stock, category, thumbnail}

    if (checkObjectValues(newProduct)) {
        manager.addProductRaw(title, description, price, thumbnail, code, stock, status, category)

        if (manager.errorMessage) {
            res.status(400).send(`Error: ${manager.errorMessage}`)
        } else {
            res.send(`Product added successfully`)
        }
    } else {
        res.status(400).send("Invalid product. It's not been added")
    }
  });

  productRouter.put("/:pid", (req, res) => {
    const {pid} = req.params
    const updatedProperties = req.body

    manager.updateProduct(parseInt(pid), updatedProperties)

    if (manager.errorMessage) {
        res.status(400).send(`Error: ${manager.errorMessage}`)
    } else {
        res.send(`Product updated successfully`)
    }
})

productRouter.delete("/:pid", (req, res) => {
    const {pid} = req.params
    manager.deleteProduct(parseInt(pid))
    res.send('Product deleted successfully')
})

  export default productRouter