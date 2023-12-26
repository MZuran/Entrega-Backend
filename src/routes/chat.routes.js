import express from 'express'
import { chatManager } from '../main.js'

const chatRouter = express.Router()

chatRouter.get('/', async (req, res) => {
  try { res.send({ status: 200, payload: await chatManager.getAllMessages() })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

chatRouter.post('/', async function (req, res) {
  try { res.send({ status: 200, payload: await chatManager.createMessage(req.body) })
  } catch (err) { res.send({ status: 400, payload: err, input: req.body }) }
})

chatRouter.get('/:cid', async (req, res) => {
  const { cid } = req.params
  try { res.send({ status: 200, payload: await chatManager.getMessageById(cid) })
  } catch (err) { res.send({ status: 400, payload: err, }) }
})

export default chatRouter
