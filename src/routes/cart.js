import express from 'express'
import { cartManager } from '../main.js'

const cartRouter = express.Router()

cartRouter.post('/', function (req, res) {
  cartManager.createCart()
  res.send(`New Cart Created Successfully`)
})

cartRouter.get('/:cid', (req, res) => {
  const { cid } = req.params
  res.json(cartManager.getCartById(parseInt(cid)))
})

cartRouter.post('/:cid/product/:pid', function (req, res) {
  const { cid, pid } = req.params
  cartManager.addProductToCart(parseInt(cid), parseInt(pid))
  res.send(`New Product added Successfully`)
})

export default cartRouter
