const functions = require("firebase-functions")
const app = require("express")()
const cors = require("cors")
app.use(cors())

const { db } = require("./util/admin") //TODO: fix error on this line

const { signup, login, resetPassword, changePassword } = require("./handlers/users")
const fbAuth = require("./util/fbAuth")

app.post("/signup", signup)
app.post("/login", login)
app.post("/reset-password", resetPassword)

exports.api = functions.region("europe-west3").https.onRequest(app)

// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!")
// })
