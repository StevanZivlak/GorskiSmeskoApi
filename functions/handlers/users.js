const { admin, db } = require("../util/admin")
const config = require("../util/config")
const firebase = require("firebase")

firebase.initializeApp(config)

exports.signup = async (req, res) => {
    const newUser = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }

    let userId, tokenVar

    try {
        const user = await db.doc(`/users/${newUser.userName}`).get()
        if (user.exists) {
            return res.status(400).json({ userName: "This username already exists." })
        }
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        const data = await firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)

        userId = data.user.uid
        const token = await data.user.getIdToken()

        tokenVar = token
        const userCredentials = {
            userName: newUser.userName,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId: userId
        }
        await db.doc(`/users/${newUser.userName}`).set(userCredentials)
        return res.status(201).json({ token: tokenVar })
    } catch (err) {
        console.error(err)

        if (err.code === "auth/email-already-in-use") {
            return res.status(400).json({ email: "Email is already in use" })
        } else {
            return res
                .status(500)
                .json({ general: "Something went while trying to sign up. Please try again." })
        }
    }
}
