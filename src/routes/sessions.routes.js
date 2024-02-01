import express from 'express'
import passport from 'passport'
import { authToken, generateToken } from '../utils.js';
import { userModel } from '../dao/models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';

import { passportCall } from '../utils.js';

import { PRIVATE_KEY } from '../utils.js';

const sessionRouter = express.Router()

//Register
sessionRouter.post('/register',async (req,res) => {
  const {name,email,passowrd} = req.body
  const exists = await userModel.findOne({ email: email })
  if (exists) return res.status(400).send({status: "error", error: "User already exists"})
  const user = {name, email, passowrd: createHash(passowrd), age, role: "user"}
  const result = await userModel.create(user)

  const access_token = generateToken(user)
  console.log("My access token is", access_token)

  res.cookie('cookieToken', access_token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true
  }).send({message: "Registered!"})
})

//Login
sessionRouter.post('/login', async (req,res)=>{
  const {email,password} = req.body
  try {
    const user = await userModel.findOne({ email: email })
    if (!user) { res.status(400).send({status: "error", error: "User Not Registered"}) }
    if (!isValidPassword(user, password)) {res.status(401).send({status: "error", error: "Invalid Credentials"})}

    const access_token = generateToken(user)

    console.log("Generated Access Token", access_token)

    res.cookie('cookieToken', access_token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true
    }).send({message: "Logged In!"});
    

  } catch (error) {
    res.status(400).send({status: "error", error: "Error When logging in: " + error})
  }
})

//Logout
sessionRouter.post('/logout', async (req, res) => {

    req.session.destroy(function(err){
      if(err){
         console.log(err);
      }else{
          res.redirect('/users/login');
      }
   });
 }); 

//Current
sessionRouter.get('/current', passportCall('jwt'), (req, res) => {
  res.send(req.user)
})

export default sessionRouter