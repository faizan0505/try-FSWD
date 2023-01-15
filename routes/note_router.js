const express = require("express")
const { noteModel } = require("../models/note_model.js");

const noteRouter = express.Router()

noteRouter.get("/data", async (req, res) => {
    try {
        const data = await noteModel.find()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

noteRouter.post("/add", async (req, res) => {
    const payload = req.body
    try {
        const data = new noteModel(payload)
        await data.save();
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

noteRouter.patch("/edit/:id", async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const note = await noteModel.findOne({ "_id": id })
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID;

    try {
        if (userID_in_note == userID_making_req) {
            const update = await noteModel.findByIdAndUpdate({ "_id": id }, payload)
            res.send("Updated")
        } else {
            res.send("You are not authorised")
        }
    } catch (error) {
        console.log(error)
    }
})

noteRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const note = await noteModel.findOne({ "_id": id })
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID;

    try {
        if (userID_in_note == userID_making_req) {
            const update = await noteModel.findByIdAndDelete({ "_id": id })
            res.send("Deleted")
        } else {
            res.send("You are not authorised")
        }
    } catch (error) {
        console.log(error)
    }
})



module.exports = { noteRouter }