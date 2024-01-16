import express from "express"

const userViewsRouter = express.Router()

userViewsRouter.get("/login", (req, res) => {
    res.render("login")
})

userViewsRouter.get("/register", (req, res) => {
    res.render("register")
})

export default userViewsRouter