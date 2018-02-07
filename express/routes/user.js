const router = require('express').Router();
const db = require('../db')

router
.get("/users/", (req, res, next) => {
      db("users")
        .then( (users) => {
        res.render("users" , {
          title: "All users",
          users,
        })
      }, next)
})

//list one user
.get("/users/:id", (req, res, next) => {
  const {id} = req.params;
  db("users")
    .where ("id", id)
    .first()
    .then( (users) => {
      if(!users)
      {
        res.render("users", {
          title: 'Not a user'
        })
      }
    res.render("users", {
      title: "User Found",
      users,
    })
  }, next)
})

//list one user
.get("/users/:id", (req, res, next) => {
  const {id} = req.params;
  db("users")
    .where ("id", id)
    .first()
    .then( (users) => {
      if(!users)
      {
        res.render("users", {
          title: 'Not a user'
        })
      }
    res.render("users", {
      title: "User Found",
      users,
    })
  }, next)
})



//Add all users
.post("/users/", (req, res, next) => {
      db("users")
        .insert(req.body)
        .then( (myusers) => {
        res.send(myusers)
      }, next)
})

//update user
.put("/users/:id", (req, res, next) => {
  const {id} = req.params;
  db("users")
    .where ("id", id)
    .update(req.body)
    .then( (results) => {
      if(results === 0) {
        res.send('not found')
      }
      res.send('done')
  }, next)
})

//list one user
.delete("/users/:id", (req, res, next) => {
  const {id} = req.params;
  db("users")
    .where ("id", id)
    .delete()
    .then( (results) => {
      if(results === 0) {
        res.sendStatus(400)
      }
      res.sendStatus(200)
  }, next)
})


module.exports = router
