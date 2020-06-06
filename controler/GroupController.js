const Group = require('../Models/Group')
const Meetup = require('../Models/Meetup')

async function createGroup(req, res){
    const {
        name,
        description,
        category
    }= req.body

    if(!name){
        return res.status(400).json({error: true, message: 'Name must be provided'})
    }else if(typeof name !=='string'){
        return res.status(400).json({error: true, message: 'Name must be a string'})
    }else if(name.length < 5){
        return res.status(400).json({error: true, message: 'Name must have 5 characters long'})
    }

    if(!description){
        return res.status(400).json({error: true, message: 'description must be provided'})
    }else if(typeof description !=='string'){
        return res.status(400).json({error: true, message: 'description must be a string'})
    }else if(description.length < 10){
        return res.status(400).json({error: true, message: 'description must have 10 characters long'})
    }

    const group = new Group({name, description})
    try{
        return res.status(201).json({error: false, group: await group.save()})
    }catch(e){
        return res.status(400).json({error: true, message: 'Error when creating a group'})
    }

}



async function createGroupMeetup(req, res){
    const {title, description} = req.body
    const {groupId} = req.params

    if(!title){
        return res.status(400).json({error: true, message: 'title must be provided'})
    }else if(typeof title !=='string'){
        return res.status(400).json({error: true, message: 'title must be a string'})
    }else if(title.length < 5){
        return res.status(400).json({error: true, message: 'title must have 5 characters long'})
    }

    if(!description){
        return res.status(400).json({error: true, message: 'description must be provided'})
    }else if(typeof description !=='string'){
        return res.status(400).json({error: true, message: 'description must be a string'})
    }else if(description.length < 10){
        return res.status(400).json({error: true, message: 'description must have 10 characters long'})
    }

    if(!groupId){
        return res.status(400).json({error: true, message: 'Group id must be provided'})
    }

    try{
     const {meetup, group} = await Group.addMeetup(groupId, {title, description})
     return res.status(201).json({error: false, meetup, group})
    }catch(e){
        return res.status(400).json({error: true, message: "Meetup cannot be created!"})
    }
    
}

async function getGroupMeetups(req, res){
    const {groupId} = req.params

    if(!groupId){
        return res.status(400).json({error: true, message: 'You need to provide a groud id'})    
    } 

    // Search for group
    const group = await Group.findById(groupId)

    if(!group){
        return res.status(400).json({error: true, message: 'group do not exist'})   
    } 

    try{
         return res.status(200).json({
            error: false,
            meetups: await Meetup.find({group: groupId}).populate('group', 'name')
         })
    }catch(e){
        return res.status(400).json({error: true, message:"cannot fetch meetup"})
    }
  


}




module.exports = {
    createGroup,
    createGroupMeetup,
    getGroupMeetups
}