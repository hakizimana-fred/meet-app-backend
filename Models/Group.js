const mongoose = require('mongoose')
const {Schema} = mongoose

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Name must be 5 characters long"]
    },
    description: {
        type: String,
        required: true,
        minLength: [10, "Description must be 10 characters long"]
    },
    category:{
        type: String
    },
    meetups: [{
        type: Schema.Types.ObjectId,
        ref: 'Meetup'
    }]
}, {timestamps: true})


// Create a meet up and add it to the meetups array in the group

GroupSchema.statics.addMeetup = async function(id, args){
    const Meetup = mongoose.model('Meetup')

    // we add the group id to the meetup group element
    const meetup = await new Meetup({...args, group: id})

    // we found the group with the id provided in the url and we push the meet up id

     const group = await this.findByIdAndUpdate(id, {$push: {meetups: meetup.id} })


  

     return {
        meetup: await meetup.save(),
        group: await group.save()
     }
}


module.exports = mongoose.model('Group', GroupSchema)