
const { Schema, model } = require('mongoose');

const schemaCategory = new Schema({
    label: String,
    icon: String,
    color: String
})

module.exports = model('Category', schemaCategory)

