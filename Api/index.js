
// Importing express module in index.js File
const express = require("express")

// Creating instance of the express App
const App = express()

// Importing Files Storing various users Data
const users = require("../Database/users.js")
const users2 = require("../Database/users2.js")
const users3 = require("../Database/users3.js")
const users4 = require("../Database/users4.js")


// Route to Handle the root url "/" and show message
App.get("/", (req, res) => {
   res.status(200)
      .send("<html><head></head><body><h1>👋Hello Guys👋</h1></body></html>")
})

//  Route to Handle get url "/users" and display all the users
App.get("/users", (req, res) => {
   res.status(200)
      .json(users)
})

//   Route to Handle get url "/users/search" that display only searched users by the client basee on their name and Designation
App.get("/users/search", (req, res) => {
   const { name, Designation } = req?.query

   const getuserbyquery = users.filter((user) => user.name.includes(name) || user.Designation.includes(Designation))

   res.status(200)
      .json(getuserbyquery)
})


//  Route to Handle the get url "/users/:id" that display only those  user whoses id is  entered by the client in the endpoint url
App.get("/users/:id", (req, res) => {
   const id = req?.params?.id

   const getuserbyid = users.filter((user) => user.id == id)

   res.status(200)
      .json(getuserbyid)
})

//  Parsing express to json
App.use(express.json())


//  Route to Handle post url "/users2" that append or add new user in the database 
App.post("/users2", (req, res) => {
   const data = req.body

   users2.push(data)

   res.status(201)
      .json(data)

   console.log(users2)

})

// Route to Handle put url "/users3/:id" that update the existing user based on the id entered by the client
App.put("/users3/:id", (req, res) => {
   const id = parseInt(req?.params?.id)

   const { name } = req.body
   const { Designation } = req.body

   const idx = parseInt(users3.findIndex((user) => user.id === id))

   users3.at(idx).name = name
   users3.at(idx).Designation = Designation


   res.status(203)
      .json(users3)

   console.log(users3)

})

// Route to handle the delete url "/users4/:id" that removes the user whose id is mentioned in the endpoint url  by the client
App.delete("/users4/:id", (req, res) => {
   const id = parseInt(req?.params?.id)
   console.log(id)

   const deleteuserbyid = users4.filter((user) => user.id !== id)

   res.status(200)
      .json(deleteuserbyid)


})

// Wildcard Route to Handle the undesfined url Entered by the client
App.use((req, res) => {
   res.status(404)
      .send("<html><head></head><body><h1>404 Not Found ! </h1></body></html>")
})

// Listen the Server on the Port 3000
App.listen("3000", () => {
   console.log("Running server on the port 3000")
})