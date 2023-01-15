const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    title:String,
    done:Boolean,
    userID:String
},{
    versionKey:false
})

const noteModel = mongoose.model("fs_notes",noteSchema)

module.exports = {noteModel}