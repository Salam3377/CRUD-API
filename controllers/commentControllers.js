////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Car = require("../models/cars")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////



//POST comments for only loggenIn users
router.post('/:carId', (req,res) => {
    const carId = req.params.carId
    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }

    //find fruit
    Car.findById(carId)
    .then(car => {
        //push comment into array
        car.comments.push(req.body)
        //saving fruit
        return car.save()
    })
    .then(car => {
        res.status(200).json({car:car})
    })
    .catch(err => console.log(err))
})

// DELETE only the author of the comment can delete it
router.delete('/delete/:carId/:commentId', (req,res) => {
    const carId = req.params.carId
    const commentId = req.params.commentId
    //get the fruit
    Car.findById(carId)
        .then(car => {
            //get the comment
            const theComment = car.comments.id(commentId)
            console.log('the found comment', theComment)
            if(req.session.loggedIn) {
                // only author can delete it
                if(theComment.author == req.session.userId) {
                    theComment.remove()
                    car.save()
                    res.sendStatus(204)
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(401)
            }
        })
        .catch(err => console.log(err))
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router