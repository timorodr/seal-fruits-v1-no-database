// import express
const express = require("express")

// create a router
const router = express.Router()

// import the fruits data
const fruits = require("../models/fruits.js")

// ROUTES GO BELOW HERE

// ***************** fruits INDEX route
// get request to /fruits
// return all fruits
// "/fruits" is implied from the router
router.get("/", (req, res) => {
    // res.send(fruits)
    // "fruits/index.ejs" => "./views/fruits/index.ejs"
    // {fruits} => {fruits:fruits}
    res.render("fruits/index.ejs", {fruits})
})


// ************** NEW Route - Render a page with a form to create a new fruit
// get request to /fruits/new
// allow us to have a form to create a new fruit
// "/fruits" is implied from the router
router.get("/new", (req, res) => {
    // render a template with our form
    // fruits/new.ejs = ./views/ + fruits/new.js
    res.render("fruits/new.ejs")
})

// ****************** CREATE Route - Recevies Form Data, Creates New Fruit
// post request /fruits
// create a fruit from the form data tthen redirect bakck to index
// "/fruits" is implied from the router
router.post("/", (req, res) => {
    // get the form data from the request
    const body = req.body
    //send back the form data as JSON
    // res.send(body)
    // copnvert the readyToEat to True or false
    if(body.readyToEat === "on") {
        body.readyToEat = true
    } else {
        body.readyToEat = false
    }

    // add the fruit to the array
    fruits.push(body)

    // redirect to index page
    res.redirect("/fruits")
})


// ***************** DESTROY ROUTE - Deletes a Fruit
// DELETE -> /fruits/:id
// deletes the specified fruit, redirects to index
// "/fruits" is implied from the router
router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // then we'll splice it from the array
    // arr.splice(index, numOfItemToCut)
    fruits.splice(id, 1)
    // redirect back to index
    res.redirect("/fruits")
})

// **************** EDIT ROUTE - Render a Form to Edit a specific fruit
// GET to /fruits/:id/edit
// Render a from twith the existing values filled in
// "/fruits" is implied from the router
router.get("/:id/edit", (req, res) => {
    // Get the id from params
    const id = req.params.id
    // get the fruit being updated
    const fruit = fruits[id]
    // send the id and the fruit over to the template
    // fruits/edit.ejs -> ./views/fruits/edit.ejs
    res.render("fruits/edit.ejs", {fruit, id})
})


// ********** UPDATE ROUTE - receives the from data, updates the fruit
// PUT to /fruits/:id
// UPdate the specified fruit, then redirect to index
// "/fruits" is implied from the router
router.put("/:id", (req, res) => {
    // grab the id
    const id = req.params.id
    // grab the body
    const body = req.body
    //convert ready to eat to true or false
    if(body.readyToEat === "on") {
        body.readyToEat = true
    } else {
        body.readyToEat = false
    }

    // update the fruit (swap old version with new version)
    fruits[id] = body
    //redirect back to index page
    res.redirect("/fruits")
})




// ***************** fruits SHOW route
// get request to /fruits/:id
// return a single fruit
// "/fruits" is implied from the router
router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the fruit from the array
    const fruit = fruits[id]
    // send the fruit as the response
    // res.send(fruit)

    // render the show.ejs template
    // res.render(template, data)
    // for the template assume "/views/"
    // "fruits/show.ejs" =>  ./views/fruits/show.ejs
    res.render("fruits/show.ejs", {fruit, id})
    // {fruit} is the same as {fruit:fruit}
})







// EXPORT THE ROUTER
module.exports = router