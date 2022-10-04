require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const mongoose = require("mongoose") // import mongoose
const path = require("path") // import path module


const Car = require('./models/cars')



const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
  useNewUrlParser: true, // need these to connect and run mongoose
  useUnifiedTopology: true,
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error))

const app = express()

app.use(morgan("tiny")) 
app.use(express.urlencoded({ extended: true })) 
app.use(express.static("public"))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("server is running.")
})

//SEED
app.get("/cars/seed", (req, res) => {
    const startCars = [
      { brand: "Volvo", name: "xc90", price: 70000, color: "gray", inStock: true },
      { brand:"Honda", name: "Odyssey", price: 60000, color: "white", inStock: true },
      { brand:"BMW", name: "X5", price: 75000, color: "black", inStock: true },
      { brand:"Toyota", name: "Camry", price: 47000, color: "blue", inStock: true },
      { brand:"Honda", name: "Accord", price: 49000, color: "dark-gray", inStock: true },
    ]
  

    Car.deleteMany({}).then((data) => {
      Car.create(startCars)
        .then((data) => {
          res.json(data)
        })
    })
})
  
  //INDEX, GET request
  app.get("/cars", (req, res) => {
    Car.find({})
    .then(cars => {
        res.send({cars: cars})
    })
    .catch(err => {
        console.log(err)
        res.json(err)
    })
})

// SHOW 
app.get("/cars/:id", (req, res) => {
    // get the id from request params
    const id = req.params.id
    // find and delete the fruit
    Car.findById(id)
      .then((cars) => {
        // 204 - No Content
        res.json({cars: cars})
      })
      .catch((error) => {
        res.json({ error })
    })
})


//CREATE POST
app.post("/cars", (req,res) => {
    Car.create(req.body)
    .then(car => {
        res.status(201).json({car:car.toObject()})
    })
    .catch(error => { 
        res.json({error})
    })
})


//UPDATE
app.put("/cars/:id", (req,res) => {
    const id = req.params.id
    Car.findByIdAndUpdate(id, req.body, {new: true})
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
app.delete("/cars/:id", (req,res) => {
    const id = req.params.id
    Car.findByIdAndRemove(id)
    .then(car => {
        res.sendStatus(204)
    })
    .catch(err => {
        res.json({err})
    }) 
})
  










const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
