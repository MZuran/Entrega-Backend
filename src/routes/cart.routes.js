import express from 'express'
import { cartManager } from '../main.js'

const cartRouter = express.Router()

cartRouter.get('/', async (req, res) => {
  try { res.send({ status: 200, payload: await cartManager.getAllCarts() })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

cartRouter.get('/aggregationTest', async (req, res) => {
  try { res.send({ status: 200, payload: await cartManager.aggregateTest() })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

cartRouter.get('/deleteTest', async (req, res) => {
  const { cid, pid } = req.query

  try { res.send({ status: 200, payload: await cartManager.deleteProduct(cid, pid) })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

cartRouter.post('/', async function (req, res) {
  try { res.send({ status: 200, payload: await cartManager.createCart(req.body) })
  } catch (err) { res.send({ status: 400, payload: err, input: req.body }) }
})

cartRouter.get('/:cid', async (req, res) => {
  const { cid } = req.params
  try { res.send({ status: 200, payload: await cartManager.getCartById(cid) })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

cartRouter.post('/:cid/product/:pid', async function (req, res) {
  const { cid, pid } = req.params
  try { res.send({ status: 200, payload: await cartManager.addItemToCart(cid,pid) })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

cartRouter.delete('/:cid/product/:pid', async function (req, res) {
  const { cid, pid } = req.params
  try { res.send({ status: 200, payload: await cartManager.addItemToCart(cid,pid) })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

export default cartRouter
