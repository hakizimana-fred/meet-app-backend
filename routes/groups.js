const express = require('express')
const GroupController = require('../controler/GroupController')

const router = express.Router()

router.post('/groups/new', GroupController.createGroup)
router.post('/groups/:groupId/meetups/new', GroupController.createGroupMeetup)


module.exports = router