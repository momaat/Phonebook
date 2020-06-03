const mongoose = require('mongoose')

const url = 'mongodb+srv://momaat:pikkukakkonen@cluster0-iq9bu.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

Person
    .find({})
    .then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })



/*const person = new Person({
    name: 'Niiskuneiti',
    number: "040-12345"
})

person
    .save()
    .then (response => {
        console.log('person saved!')
        mongoose.connection.close()
})*/

  
