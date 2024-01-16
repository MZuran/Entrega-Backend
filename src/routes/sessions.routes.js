import express from 'express'
import { userModel } from '../dao/models/user.model.js'

const sessionRouter = express.Router()

const adminSession = {
  name: `Administrator`,
  email: "adminCoder@coder.com",
  age: 0,
  role: "admin"
}

function adminCredentials(email, password) {
  return email == "adminCoder@coder.com" && password == "adminCod3r123"
}

//Register
sessionRouter.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body

  //Find out if the user already exists in DB
  const exists = await userModel.findOne({email})
  if (exists) {res.status(400).send({status: "error", payload: {message: "User already registered in DB"}})}

  const user = { first_name, last_name, email, age, password }

  const result = userModel.create(user)
  res.send({status: "success", payload: {message: "User created successfully", user: result}})
})

//Login
sessionRouter.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email, password})
    const isAdmin = adminCredentials(email, password)

    if (!user && !isAdmin) {return res.status(401).send({status: "error", payload: {message: "Incorrect credentials"}})}

    if (!isAdmin) {
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role
    }
    }

    if (isAdmin) {req.session.user = adminSession}

    res.send({status: "success", payload: {message: "Logged in successfully", user: req.session.user}})
})

//Logout
sessionRouter.post('/logout', async (req, res) => {
  req.session.destroy()
  res.send({status: "success", payload: {}})
})

export default sessionRouter
