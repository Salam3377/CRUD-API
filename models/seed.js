

//dependencies
const mongoose = require('./connection')
const Cars = require('./cars')




///////////////////////////////////////
// Seed Script code
///////////////////////////////////////
// first we need our connection saved to a variable for easy reference
const db = mongoose.connection

db.on('open', () => {
    // bring in the array of starter cars
    const startCars = [
        { brand: "Volvo", name: "xc90", price: 70000, color: "gray", inStock: true },
        { brand:"Honda", name: "Odyssey", price: 60000, color: "white", inStock: true },
        { brand:"BMW", name: "X5", price: 75000, color: "black", inStock: true },
        { brand:"Toyota", name: "Camry", price: 47000, color: "blue", inStock: true },
        { brand:"Honda", name: "Accord", price: 49000, color: "dark-gray", inStock: true },
      ]

    // delete all the existing cars
    Cars.deleteMany({})
        .then(deletedCars => {
            console.log('this is what deleteMany returns', deletedCars)

            // create a bunch of new cars from cars
            // use create or deleteMany
            Cars.create(startCars)
                .then(data => {
                    console.log('here are new cars', data)
                    // always close connection to the db
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    // always close connection to the db
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            // always close connection to the db
            db.close()
        })
})
