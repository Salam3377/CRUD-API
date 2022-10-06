

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
        res.json({cars: cars})
    })
    .catch(err => console.log(err))
})

// SHOW owner only
router.get('/mine', (req, res) => {
    Cars.find({ owner: req.session.userId })
        .then(cars => {
            res.status(200).json({ cars: cars })
        })
        .catch(error => res.json(error))
  })

// SHOW 
router.get("/:id", (req, res) => {
    // get the id from request params
    const id = req.params.id
    // find and delete the fruit
    Cars.findById(id)
      .populate("comments.author","username")
      .then((car) => {
        // 204 - No Content
        res.json({car: car})
      })
      .catch(error => console.log(error))
})


//CREATE POST
router.post("/", (req,res) => {
    req.body.owner = req.session.userId
    Cars.create(req.body)
    .then(car => {
        res.status(201).json({car: car.toObject() })
    })
    .catch(error => console.log(error))
})


//UPDATE
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
    Cars.findById(id)
    .then(car => {
        if(car.owner == req.session.userId) {
            res.sendStatus(204)
            return car.deleteOne()
        } else {
            res.sendStatus(401)
        }
    })
    .catch(err => res.json(err)) 
})

//Export the router
module.exports = router