const { admin, db } = require("../util/admin")
const config = require("../util/config")
const firebase = require("firebase")
const { response } = require("express")

firebase.initializeApp(config)

/**Sign up as a new user */
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

exports.login = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        const data = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        const token = await data.user.getIdToken()
        return res.json({ token })
    } catch (err) {
        console.error(err)
        return res.status(403).json({ general: "Wrong credentials, please try again." })
    }
}

exports.resetPassword = async (req, res) => {
    const emailToReceivePassword = req.body.email
    try {
        await firebase.auth().sendPasswordResetEmail(emailToReceivePassword)
        return res.status(200).json({ general: "Password reset successfully." })
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ general: "Something went while trying to reset password. Please try again." })
    }
}
