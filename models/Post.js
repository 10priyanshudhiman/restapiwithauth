const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    createdby: {
        type: ObjectId,
        ref: "User"
        
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type:Date,
        default: Date.now

    },
    message: {
        type: String,
        required: true
    },
    comments: [
        {
            sentBy: {
                type: ObjectId,
                 ref: "User"
                
            },
            sentAt:{
                type: Date,
                default: Date.now
            },
            liked: [{
                type: ObjectId,
                 ref: "User"
                
            }]
        }
    ]


});
module.exports = mongoose.model('Posts',postSchema);