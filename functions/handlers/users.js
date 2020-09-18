const { admin, db } = require("../util/admin")
const config = require("../util/config")
const firebase = require("firebase")

firebase.initializeApp(config)

// exports.signup = (req, res) => {
//     const newUser = {
//         userName: req.body.userName,
//         email: req.body.email,
//         password: req.body.password,
//         confirmPassword: req.body.confirmPassword
//     }

//     //TODO: entered data validation here

//     let userId, tokenVar

//     db.doc(`/users/${newUser.userName}`)
//         .get()
//         .then((user) => {
//             if (user.exists) {
//                 return res.status(400).json({ userName: "This username already exists." })
//             } else {
//                 return firebase
//                     .auth()
//                     .createUserWithEmailAndPassword(newUser.email, newUser.password)
//             }
//         })
//         .then((data) => {
//             userId = data.user.uid
//         })
//         .then((token) => {
//             tokenVar = token
//             const userCredentials = {
//                 userName: newUser.userName,
//                 email: newUser.email,
//                 createdAt: new Date().toISOString(),
//                 userId: userId
//             }
//             return db.doc(`/users/${newUser.userName}`).set(userCredentials)
//         })
//         .then(() => {
//             return res.status(201).json({ token: tokenVar })
//         })
//         .catch((err) => {
//             console.error(error)
//             if (error.code === "auth/email-already-in-use") {
//                 return res.status(400).json({ email: "Email is already in use" })
//             } else {
//                 return res
//                     .status(500)
//                     .json({ general: "Something went while trying to sign up. Please try again." })
//             }
//         })
// }
