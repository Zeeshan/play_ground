const router = require('express').Router();
const passport = require('passport')

router
  .get("/register", (req, res, next) =>{
        res.render("signup" , {message: req.flash('error')})
    })

  .post("/register", passport.authenticate("local-signup", {
    successRedirect:'/users',
    failureRedirect:'/register',
    failureFlash : true,
  }) )

  .get("/login", (req, res, next) =>{
        res.render("login" , {message: req.flash('error')})
    })

  .post("/login", passport.authenticate("local", {
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash : true,
  }) )

  .get("/logout", (req, res, next) =>{
        req.session.destroy((err)=> {
          res.redirect("/login")
        })
    })
module.exports = router
