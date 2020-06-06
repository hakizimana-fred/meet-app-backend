const Meetup = require('../Models/Meetup')

async function createMeetup(req, res){
     const {title, description} = req.body
     const newMeetup = new Meetup({title, description})

     try{   
         return res.status(201).json({meetup : await newMeetup.save()})
     }catch(e){
         return res.status(e.status).json({error: true, message: 'Error with meet up'})
     }
}

async function getMeetups(req, res){
	try{
        return res.status(200).json({meetups : await Meetup.find()})
    }catch(e){
        return res.status(404).json({error : true, message : "Error fetching"})
    }
}

module.exports = {
    createMeetup,
    getMeetups
}