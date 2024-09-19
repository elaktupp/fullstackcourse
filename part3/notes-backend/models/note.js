const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

if (!url) {
  console.log('ERROR: Environment variable MONGODB_URI is not defined!', url)
}

console.log('connecting to', url)

mongoose
  .connect(url)

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Mongoose validation rules for Schema.
// - "content" has validation rules (minLenght, required are build-in validatiors)
// - "important" does not have rules
// Object breaking rules causes database operation
// to throw an exception.
const noteSchema = new mongoose.Schema({
  content: { type: String, minLength: 5, required: true },
  important: Boolean,
})

// Transformation method "toJSON":
// Since _id is actually an object it is
// changed to string (id) for a return object,
// and strip away unnecessary __v and _id from it.
// Check mongoosejs.com/doc for more info.
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Note', noteSchema)
