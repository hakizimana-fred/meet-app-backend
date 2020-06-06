const express = require('express')
const GroupController = require('../controler/GroupController')

const router = express.Router()



router.get('/groups/:groupId/meetups', GroupController.getGroupMeetups)

module.exports = router