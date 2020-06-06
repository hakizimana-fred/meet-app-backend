const express = require('express')
const Meetup = require('../Models/Meetup')
const controller = require('../controler/controler')

const router = express.Router()


router.get('/meetups', controller.getMeetups)


router.post('/meetups', controller.createMeetup)

module.exports = router