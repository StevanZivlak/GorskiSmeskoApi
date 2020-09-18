const { request } = require("express")
const { admin, db } = require("../util/admin")

module.exports = async (req, res, next) => {
    let idToken
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        idToken = req.headers.authorization.split("Bearer ")[1]
    } else {
        return res.status(403).json({ error: "Unauthorized." })
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        req.user = decodedToken
        data = await db.collection("users").where("userId", "==", req.user.uid).limit(1).get()
        const userDataFromDB = data.docs[0].data()
        req.user.userName = userDataFromDB.userName
        return next()
    } catch (err) {
        console.error("Error while verifying token ", error)
        return response.status(403).json(error)
    }
}
