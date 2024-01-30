import passport from 'passport'
import local from 'passport-local'
import { userModel } from '../dao/models/user.model'
import { createHash, isValidPassword } from '../utils'

const localStrategy = local.Strategy

const initializePassport = () => {

  //Register Strategy
  passport.use('register', new localStrategy({ passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {

      const { first_name, last_name, email, age } = req.body
      try {

        let user = userModel.findOne({ email: username })
        if (user) { console.log('User Already Exists!'); return done(null, false) }

        const newUser = { first_name, last_name, email, age, password: createHash(password), }

        let result = await userModel.create(newUser)
        return done(null, result)

      } catch (error) {
        return done('Error When Registering user! ' + error)
      }
    },),)

  //Login Strategy
  passoport.use('login', new localStrategy({ usernameField: "email" },
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

  //Serializing and Deserializing
  passport.serializeUser((user, done) => { done(null, user._id) })

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id)
    done(null, user)
  })
}

export default initializePassport
