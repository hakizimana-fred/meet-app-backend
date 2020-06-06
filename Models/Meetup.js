const mongoose = require('mongoose')
const {Schema} = mongoose

const meetUpSchema = new Schema({
    title : {
        type : String,
        required:  true,
        minLength: [5, '5 characters long at least']
    },
    description: {
        type: String,
        required: true,
        minLength: [10, '10 characters long atleast']
    },
    eventDate:{
        type: Date
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }
}, {timestamps: true})

module.exports = mongoose.model('Meetup', meetUpSchema)