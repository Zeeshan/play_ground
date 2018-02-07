const bp  = require("body-parser")
const express = require("express")
const flash = require('connect-flash')
const knex = require ("knex")
const passport = require('passport')
const session = require("express-session")
const redis = require('connect-redis')(session);

require('./passport')
const db = require('./db')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')

const app = express();
const staicAsset = __dirname +"/public"


app
  .use(bp.json())
  .use(session(
      {
        store: new redis(), 
        secret: "this is a test",
        resave: false,
        saveUninitialized: false
      }))
  .use(flash())
  .use(passport.initialize())
  .use(passport.session())
  .set("view engine", "hjs")
  .use(express.static(staicAsset))
  .use(bp.urlencoded({extended: false}))
  .use(authRoutes)
  .use(userRoutes)
  .use(postRoutes)

.get("/", (req, res, next) =>{
    res.send({
      session: req.session,
      user: req.user,
      authenticated: req.isAuthenticated(),
    })
})


// .get("/set", (req, res, next) =>{
//     req.session.name = "Zeeshan"
//     res.send(req.session)
// })


app.listen(3000);
