const mongoose = require('mongoose')

const url = 'mongodb+srv://momaat:pikkukakkonen@cluster0-iq9bu.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person