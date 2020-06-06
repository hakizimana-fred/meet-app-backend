const mongoose = require('mongoose')

module.exports = function(){
    mongoose.connect('mongodb://localhost/meet-app', {useNewUrlParser: true, useUnifiedTopology : true})
        .then(() => console.log('DB connected'))
        .catch(err => console.log(err))
}