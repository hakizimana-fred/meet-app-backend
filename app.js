const express = require('express')
const dbConfig = require('./config/db')
const morgan = require('morgan')
const meetups = require('./routes/meetups')
const groupRoute = require('./routes/groups')
const singleMeetup = require('./routes/meetup')

const app = express()
/**
 * database
 */

 dbConfig()

 app.use(express.urlencoded({extended : false}))
 app.use(express.json())

/**
 * Morgan
 */
app.use(morgan('dev'))

app.use('/api', meetups)
app.use('/create_group', groupRoute)
app.use('/single_meetup', singleMeetup)



const PORT = process.env.PORT || 5000
app.listen(PORT, err => {
    if(err) console.log(err)
    console.log('server running')
})
