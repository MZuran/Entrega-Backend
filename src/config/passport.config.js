import passport from 'passport'
import local from 'passport-local'
import { userModel } from '../dao/models/user.model.js'
import { PRIVATE_KEY, createHash, isValidPassword } from '../utils.js'

import { generateToken } from '../utils.js'

import jwt from 'passport-jwt'

const localStrategy = local.Strategy

const initializePassport = () => {

  //Register Strategy
  passport.use('register', new localStrategy({ passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {

      const { first_name, last_name, email, age } = req.body
      try {

        let user = await userModel.findOne({ email: username })
        if (user) {
          console.log('User Already Exists!')
          console.log("My req.body is", req.body)
          console.log("My user is", user)
          return done(null, false)
        }

        const newUser = { first_name, last_name, email, age, password: createHash(password), }

        let result = await userModel.create(newUser)

        return done(null, result)

      } catch (error) {
        return done('Error When Registering user! ' + error)
      }
    },),)

  //Login Strategy
  passport.use('login', new localStrategy({ usernameField: "email" },
    async (username, password, done) => {
      try {
        const user = await userModel.findOne({ email: username })
        if (!user) { console.log("User Not Registered!"); return done(null, false) }
        if (!isValidPassword(user, password)) return done(null, false)

        return done(null, user)
      } catch (error) {
        return done('Error When Logging in: ' + error)
      }
    }))

  //Cookie Extractor
  const cookieExtractor = req => {
    let token = null
    console.log("Cookie:",req.cookies)
    if (req && req.cookies) { token = req.cookies['cookieToken'] }
    console.log("My Token is", token)
    return token
  }

  //Jwt
  passport.use('jwt', new jwt.Strategy({
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: PRIVATE_KEY
  }, async (jwt_payload, done) => {
    try { return done(null, jwt_payload) }
    catch (err) { return done(err) }
  }
  ))

  //Serializing and Deserializing
  passport.serializeUser((user, done) => { done(null, user._id) })
  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id)
    done(null, user)
  })
}

export default initializePassport
