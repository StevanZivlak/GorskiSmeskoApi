const admin = require("firebase-admin")
//const credentialsFile = require("../../credentials/google-cloud.json")
//admin.initializeApp({ credential: admin.credential.cert(credentialsFile) })
admin.initializeApp()
const db = admin.firestore()

module.exports = { admin, db }
