

//Dependencies
const express = require("express")
const Cars = require("../models/cars")



//create router
const router = express.Router()



//ROUTES--v--


 //INDEX, GET request
 router.get("/", (req, res) => {
    Cars.find({})
    .populate('comments.author','username')
    .then(cars => {
        const username = req.session.username
        const loggedIn = req.session.loggedIn
        const userId = req.session.userId
        res.render('cars/index',{cars,username, loggedIn, userId})
    })
    .catch(err => console.log(err))
})

//GET for new car
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('cars/new', { username, loggedIn, userId })
})

// GET request to show the update page
router.get("/edit/:id", (req, res) => {
    res.send('edit page')
})

// SHOW owner only get req
router.get('/mine', (req, res) => {
    Cars.find({ owner: req.session.userId })
        .then(cars => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            //res.status(200).json({ cars: cars })
            res.render('cars/index', {cars, username, loggedIn, userId})
        })
        .catch(error => res.json(error))
  })

// SHOW get req
router.get("/:id", (req, res) => {
    const id = req.params.id
    Cars.findById(id)
      .populate("comments.author","username")
      .then((cars) => {
        const username = req.session.username
        const loggedIn = req.session.loggedIn
        const userId = req.session.userId
        //res.json({car: car})
        res.render('cars/show', {cars, username, loggedIn, userId})
      })
      .catch(error => console.log(error))
})


//CREATE post req
router.post("/", (req,res) => {
    req.body.inStock = req.body.inStock === 'on' ? true : false
    req.body.owner = req.session.userId
    Cars.create(req.body)
    .then(cars => {
        //res.status(201).json({car: car.toObject() })
        res.redirect('/cars')
    })
    .catch(error => console.log(error))
})


//UPDATE put req
router.put("/:id", (req,res) => {
    const id = req.params.id
    Cars.findById(id)
    .then(car => {
        if(car.owner == req.session.userId) {
            res.sendStatus(204)
            return car.updateOne(req.body)
        } else {
            res.sendStatus(401)
        }
        
    })
    .catch(err => res.json(err)) 
})

//DELETE
router.delete("/:id", (req,res) => {
    const id = req.params.id
    Cars.findByIdAndRemove(id)
    .then(car => {
        res.redirect('/cars')
        // if(car.owner == req.session.userId) {
        //     res.sendStatus(204)
        //     return car.deleteOne()
        // } else {
        //     res.sendStatus(401)
        // }
    })
    .catch(err => res.json({err})) 
})

//Export the router
module.exports = router