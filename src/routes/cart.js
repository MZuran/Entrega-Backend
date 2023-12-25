import express from 'express'
import { cartManager } from '../main.js'

const cartRouter = express.Router()

cartRouter.get('/', async (req, res) => {
  try { res.send({ status: 200, payload: await manager.getAllProducts(limit) })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

cartRouter.post('/', async function (req, res) {
  try { res.send({ status: 200, payload: await manager.createCart(req.body) })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

cartRouter.get('/:cid', async (req, res) => {
  const { cid } = req.params
  try { res.send({ status: 200, payload: await manager.getCartById(cid) })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

cartRouter.post('/:cid/product/:pid', async function (req, res) {
  const { cid, pid } = req.params
  try {
    const cartManager = manager.getCartById(cid);
    const existingProductIndex = cartManager.products.findIndex(product => product.product === parseInt(pid));

    if (existingProductIndex === -1) {
      // Product is not in the cart, add a new one with quantity 1
      cartManager.products.push({ product: parseInt(pid), quantity: 1 });
    } else {
      // Product is already in the cart, increase the quantity by 1
      cartManager.products[existingProductIndex].quantity += 1;
    }

    res.send({ status: 200, payload: cartManager.products });
  } catch (err) {
    res.send({ status: 400, payload: err });
  }
})

export default cartRouter
