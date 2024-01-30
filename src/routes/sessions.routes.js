import express from 'express'
import passport from 'passport'

const sessionRouter = express.Router()

//Register
sessionRouter.post('/register', passport.authenticate('register', {failureRedirect: '/failRegister'}),
async(req,res) => {
  res.send({staus: 'success', message: 'User Registered Successfully'})
})

sessionRouter.get('/failRegister', async(req,res) => {res.send({error: "Failed"})})

//Login
sessionRouter.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}),
async(req, res) => {
  if (!req.user) return res.status(400).send({staus: 'Error', error: 'Invalid Credentials'})

  req.session.user ={
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
    role: req.user.role
  }

  res.send({status: 'Success', payload: req.user})
})

sessionRouter.get('/failLogin', (req,res)=>{res.send({error: 'Failed Login'})})

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


export default sessionRouter

//Register
/* sessionRouter.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body

  //Find out if the user already exists in DB
  const exists = await userModel.findOne({email})
  if (exists) {res.status(400).send({status: "error", payload: {message: "User already registered in DB"}})}

  const user = { first_name, last_name, email, age, password: createHash(password) }

  const result = userModel.create(user)
  res.send({status: "success", payload: {message: "User created successfully", user: result}})
}) */

//Login
/* sessionRouter.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email})

    if (!unregisterDecorator) {return res.status(400).send({status: "error", payload: {message: "User not Found"}})}
    if (!isValidPassword(user,password)) {return res.status(403).send({status: "error", error: "Incorrect Password"})}

    delete user.password;
    
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role
    }

    res.send({status: "success", payload: {message: "Logged in successfully", user: req.session.user}})
}) */
