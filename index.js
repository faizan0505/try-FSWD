const express = require("express");
const cors = require("cors")
const { userRouter } = require("./routes/signup_router.js")
const { connection } = require("./configs/db.js");
const { authenticate } = require("./middleware/authentication.js")
const { noteRouter } = require("./routes/note_router.js")

const app = express();
app.use(express.json())
app.use(cors())

app.use("", userRouter)
app.use(authenticate)
app.use("/notes", noteRouter)

app.listen(3500, async () => {
    try {
        await connection;
        console.log("DB connected successfully")
    } catch (error) {
        console.log("Not connect DB" + error)
    }
    console.log("Server is Running at port 3500")
})