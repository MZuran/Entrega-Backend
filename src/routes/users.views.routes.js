import express from "express"

const userViewsRouter = express.Router()

userViewsRouter.get("/login", (req, res) => {
    res.render("login")
})

userViewsRouter.get("/register", (req, res) => {
    res.render("register")
})

userViewsRouter.get("/", (req, res) => {
    console.log("my req session", req.session)
    res.render("profile", {
        user: req.session.user
    })
})

export default userViewsRouter