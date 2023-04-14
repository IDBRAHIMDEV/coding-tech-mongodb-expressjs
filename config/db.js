const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
    dbName: process.env.DB_NAME
})
.then(() => {
    console.log('App is connected with MongoDB ...')
})
.catch(err => {
    console.log(err)
})