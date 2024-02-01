import express from "express"

//Import Handlebars Components
import handlebars from 'express-handlebars'
import _dirname from "./utils.js";

//Import Views
import viewsRouter from "./routes/views.routes.js";
import userViewsRouter from "./routes/users.views.routes.js";

//Import API routes
import productRouter from "./routes/products.routes.js"
import cartRouter from "./routes/cart.routes.js"
import chatRouter from "./routes/chat.routes.js";
import sessionRouter from "./routes/sessions.routes.js";

//Mongo
import mongoose from "mongoose";

//Websockets
import { initializeSocket } from "./server.js";

//Import Data Access Objects
import productDao from "./dao/dbManager/product.dao.js";
import cartDao from "./dao/dbManager/cart.dao.js";
import chatDao from "./dao/dbManager/chat.dao.js";

//Import Sessions and Connect mongo for session management
import session from "express-session";
import MongoStore from "connect-mongo";

//Import Passport
import passport from "passport";
import initializePassport from "./config/passport.config.js";

//Import Cookies
import cookieParser from "cookie-parser";

//Initialize App
const app = express()

app.use((req, res, next)=> { express.json()(req,res,next) })
app.use(express.urlencoded({extended: true}))

const httpServer = app.listen("8080", () => {
    console.log("Listening on port 8080")
})

//HandleBars
app.engine("handlebars", handlebars.engine())
app.set('views', _dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static(_dirname + '/public'))

//Web Socket
const io = initializeSocket(httpServer)

//MongoDB
const mongoDBUrl = 'mongodb://127.0.0.1:27017/ecommerce'
mongoose.connect(mongoDBUrl)
.then(() => console.log("Connected to Database"))
.catch((err) => console.log(err))

//Middlewares
app.use(session({
    secret: "secretKey",
    resave: true,
    saveUninitialized: true,
    //Filestore
    store: MongoStore.create({
        mongoUrl: mongoDBUrl,
        ttl: 10 * 60,
        //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
initializePassport()

export function logOut() {
    //req.session.destroy(err => console.log(err))
    alert(test)
}

//Data Access Objects
export const manager = new productDao()
export const cartManager = new cartDao()
export const chatManager = new chatDao()

//Routes
app.use('/api/products', productRouter )
app.use('/api/carts', cartRouter )
app.use('/api/chat', chatRouter)
app.use('/api/sessions', sessionRouter)

app.use('/', viewsRouter)
app.use('/users', userViewsRouter)