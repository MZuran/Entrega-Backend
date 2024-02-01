import { dirname } from 'path';
import { fileURLToPath } from 'url';

import jwt from 'jsonwebtoken';
import passport from 'passport';

export const PRIVATE_KEY = "SecretJSONWebTokenKey"

//JsonWebToken
export const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" })
    return token
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).send({ error: 'not authenticated' })

    const token = authHeader.split(' ')[1]

    //Credentials: If the token is successfully verified, the decoded information will be passed to this parameter. 
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ status: "error", error: "Not authentified" })
        req.user = credentials.user
        next()
    })
}

export const passportCall = (strategy) => {
    return async (req,res,next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if (err) return next(err)
            if (!user) { return res.status(401).send({ error: info.messages?info.messages:info.toString() }) }
            req.user = user
            next()
        })(req,res,next)
    }
}

//Bcrypt
import bcrypt from "bcrypt";
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

//Dirname
const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename);

export default _dirname