import express from 'express'
import { manager } from '../main.js'

import { checkObjectValues } from '../auxiliary functions/checkObjectValues.js'

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit)

  try { res.send({ status: 200, payload: await manager.getAllProducts(limit) })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

productRouter.get('/:pid', async (req, res) => {
  const { pid } = req.params
  
  try { res.send({ status: 200, payload: await manager.getProductById(pid) })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

productRouter.post('/', async function (req, res) {
  const { title, description, code, price, status, stock, category, thumbnail, } = req.body
  const newProduct = { title, description, code, price, status, stock, category, thumbnail, }
  console.log('app post on api')

  try { res.send({ status: 200, payload: await manager.createProduct(newProduct) })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

productRouter.put('/:pid', async (req, res) => {
  const { pid } = req.params
  const updatedProperties = req.body

  try { res.send({ status: 200, payload: await manager.updateProduct(pid, updatedProperties) })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

productRouter.delete('/:pid', async (req, res) => {
  const { pid } = req.params

  try { res.send({ status: 200, payload: await manager.deleteProduct(pid) })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

export default productRouter
