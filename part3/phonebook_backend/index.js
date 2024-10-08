// MIDDLEWARE

const errorHandler = (error, req, resp, next) => {
  console.log(error)
  if (error.name === 'CastError') {
    resp.status(400).send({ error: 'malformed id:' })
  } else if (error.name === 'ValidationError') {
    resp.status(400).send({ error: error.message })
  }
  next(error)
}

// CODE

// Environment variables
require('dotenv').config() // do this before database models

// Http request logger
const morgan = require('morgan')

// Custom token for contact logging
morgan.token('contact', (req) => {
  let payload = '(no payload)'
  if (Object.keys(req.body).length > 0) {
    payload = JSON.stringify(req.body)
  }
  return payload
})

const express = require('express')
const app = express()
app.use(express.json()) // for easier json data access

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :contact'
  )
)

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

// DATABASE, MODEL
const Contact = require('./models/contact')

// ROOT PAGE

app.get('/', (req, resp) => {
  resp.send('<h1>Phonebook Backend</h1>')
})

// INFO PAGE

app.get('/info', (req, resp) => {
  Contact.find({})
    .then((contacts) => {
      let info = `<p>Phonebook has info for ${contacts.length} people</p>`
      info += `<p>${new Date()}</p>`
      resp.send(info)
    })
    .catch((error) => {
      let info = `<p>Failed to get Phonebook info.</p><p>${error.message}</p>`
      resp.send(info)
    })
})

// ALL CONTACTS

app.get('/api/persons', (req, resp) => {
  Contact.find({}).then((contacts) => {
    resp.json(contacts)
  })
})

// CONTACT BY ID

app.get('/api/persons/:id', (req, resp, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      resp.json(contact)
    })
    .catch((error) => next(error))
})

// DELETE BY ID

app.delete('/api/persons/:id', (req, resp, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => {
      resp.status(204).end() // 204 no content
    })
    .catch((error) => next(error))
})

// UPDATE BY ID - update existing contact number

app.put('/api/persons/:id', (req, resp, next) => {
  // console.log("PUT UPDATE:", req.params.id, req.body.name, req.body.number);
  const { name, number } = req.body
  Contact.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedContact) => {
      resp.json(updatedContact)
    })
    .catch((error) => next(error))
})

// CREATE NEW CONTACT - create new contact with valid name and number

app.post('/api/persons', (req, resp, next) => {
  const body = req.body
  let errors = checkNewContactForErrors(body.name, body.number)

  if (errors.length > 0) {
    return resp.status(400).json({ error: `${errors.join(',')}` })
  }

  // Check if name already exists and if it does return error.
  // - Error is returned because it is not POST method's resposibility
  // to change its behavior from create to update.
  // - Client should check if name exists and then call create
  // or update accordingly.
  Contact.findOne({ name: body.name })
    .then((contact) => {
      if (contact !== null) {
        return resp.status(400).json({ error: 'name already exists' })
      } else {
        const newContact = new Contact({
          name: body.name,
          number: body.number,
        })

        // console.log("CREATE NEW:", newContact);

        newContact
          .save()
          .then((savedContact) => {
            resp.json(savedContact)
          })
          .catch((error) => next(error))
      }
    })
    .catch((error) => next(error))
})

// Error handler has to be last loaded middleware and also after routes!
app.use(errorHandler)

const checkNewContactForErrors = (name, number) => {
  let errors = []

  if (!name) {
    errors.push('name is missing')
  }

  if (!number) {
    errors.push('number is missing')
  }

  return errors
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Phonebook Server running on port ${PORT}`)
})
