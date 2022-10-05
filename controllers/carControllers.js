

//Dependencies
const express = require("express")
const Cars = require("../models/cars")



//create route
const router = express.Router()

 //INDEX, GET request
 router.get("/", (req, res) => {
    Cars.find({})
    .then(cars => {
        res.send({cars: cars})
    })
    .catch(err => {
        console.log(err)
        res.json(err)
    })
})

// SHOW 
router.get("/:id", (req, res) => {
    // get the id from request params
    const id = req.params.id
    // find and delete the fruit
    Cars.findById(id)
      .then((cars) => {
        // 204 - No Content
        res.json({cars: cars})
      })
      .catch((error) => {
        res.json({ error })
    })
})


//CREATE POST
router.post("/", (req,res) => {
    Cars.create(req.body)
    .then(car => {
        res.status(201).json({car:car.toObject()})
    })
    .catch(error => { 
        res.json({error})
    })
})


//UPDATE
router.put("/:id", (req,res) => {
    const id = req.params.id
    Cars.findByIdAndUpdate(id, req.body, {new: true})
    .then(car => {
        console.log(car)
        res.sendStatus(204)
    })
    .catch(err => {
        res.json({err})
        console.log(err)
    }) 
})

//DELETE
router.delete("/:id", (req,res) => {
    const id = req.params.id
    Cars.findByIdAndRemove(id)
    .then(car => {
        res.sendStatus(204)
    })
    .catch(err => {
        res.json({err})
    }) 
})

//Export the router
module.exports = router