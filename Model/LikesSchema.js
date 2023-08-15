const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    Photo: {
        type: String,
    },
    likes: [
        {

            userLikeId: {
                type: String
            }
        }
    ]



})

module.exports = mongoose.model("USER", userSchema)