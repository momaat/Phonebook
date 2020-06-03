const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))
/*
let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-234567",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }  
]*/


app.get('/api/persons', (req, res) => {
    Person
        .find({}, {_v: 0})
        .then(persons => {
            res.json(persons.map(formatPerson))
        })
        .catch(error => {
            console.log(error1)
            res.status(404).end()
        })
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(formatPerson(person))
            } else {
                res.status(404).end()
            }
            
        })
        .catch(error => {
            console.log(error2)
            res.status(400).send({error: 'malformatted id'})
        })
    })        



app.delete('/api/persons/:id', (req, res) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => {
            res.status(400).send({error: 'malformatted id'})
        })
        
  /*  const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()*/
})

const generateId = () => {
    let min = 0
    let max = 10000
    let id = Math.random() * (+max - +min) + +min
    return id.toFixed(0) 
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (body.name === undefined) { //ehto, jos nimi puttuu requestista
        return res.status(400).json({error: 'name missing'})
    } else if (body.number === undefined) { //ehto, jos numero puuttuu requestista
        return res.status(400).json({error: 'number missing'})
    }    
    /*    
    } else if (persons.some(n => {n.name === body.name})) {
        return res.status(400).json({error: 'name must be unique'})
    }*/
    
    Person
        .exists(
            {name: body.name},
            function(err, result) {
                if (err) {
                    console.log(err)
                    return res.status(400).json({error: 'Bad contact name format'})
                } else if (result) {
                    return res.status(400).json({error: 'Contact name already exists.'})
                } else {
                    const person = new Person({
                        name: body.name,
                        number: body.number,
                    })
                    person
                        .save()
                        .then(savedPerson => {
                            res.json(formatPerson(savedPerson))
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(404).send({error: 'Adding contact failed'})
                        })
                    }        
        })
})    

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
