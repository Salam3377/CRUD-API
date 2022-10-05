
//old way mongoose import
//const mongoose = require("mongoose") // import mongoose

const mongoose = require('./connection')

// we're going to pull the Schema and model from mongoose
// we'll use a syntax called "destructuring"
const { Schema, model } = mongoose
// schema
const carSchema = new Schema({
    brand: String,
    name: String,
    price: Number,
    color: String,

    inStock: Boolean
})

// make model
const Car = model("cars", carSchema)

//export model
module.exports = Car

