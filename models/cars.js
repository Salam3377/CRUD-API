const mongoose = require("mongoose") // import mongoose

const { Schema, model } = mongoose

// fruits schema
const carSchema = new Schema({
    brand: String,
    name: String,
    price: Number,
    color: String,

    inStock: Boolean
})

const Car = model("cars", carSchema)

module.exports = Car

