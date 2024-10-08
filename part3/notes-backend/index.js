//
// MIDDLEWARE
//
const requestLogger = (req, resp, next) => {
  console.log('Method:', req.method)
  console.log('Path  :', req.path)
  console.log('Body  :', req.body)
  console.log('- - - - - - - - - -')
  next()
}

const unknownEndpoint = (req, resp) => {
  resp.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, resp, next) => {
  console.log(error)
  if (error.name === 'CastError') {
    resp.status(400).send({ error: 'malformed id:' })
  } else if (error.name === 'ValidationError') {
    resp.status(400).send({ error: error.message })
  }
  next(error)
}

//
// CODE
//
require('dotenv').config() // do this before database models

const express = require('express')
const app = express()

// Express json for easier data access, (among) very first to be loaded.
app.use(express.json())
// Note that logger must be after json parser,
// otherwise body would be empty. Order of
// appearance in code is also execution order
// of middleware.
app.use(requestLogger)

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

//
// DATABASE, MODELS
//
const Note = require('./models/note')

//
// ROOT
//
app.get('/', (request, response) => {
  response.send('<h1>Hello There!</h1>')
})

//
// API / GET ALL NOTES
//
app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

//
// API / GET NOTE BY ID
//
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error)) // moving error handling into middleware
})

//
// API / DELETE
//
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end() // 204 = no content
    })
    .catch((error) => next(error))
})

//
// API / UPDATE
//
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

//
// API / NEW NOTE
//
app.post('/api/notes', (request, response, next) => {
  // NOTE: Without the json-parser request.body would be undefined.
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  })

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((error) => next(error))
  // Catches, e.g. a note with invalid content that causes database
  // to throw an exception.
})

// Non-existing route, set AFTER ROUTES!
app.use(unknownEndpoint)

// Error handler has to be last loaded middleware and also after routes!
app.use(errorHandler)

// *** NOTE ***
// The execution order of middleware is the same as the order that they are loaded
// into Express with the app.use function.
// For this reason, it is important to be careful when defining middleware.
//

//
// START LISTENING
//
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
