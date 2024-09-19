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

const contactSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{4}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
})

// Transformation method "toJSON":
// Since _id is actually an object it is
// changed to string (id) for a return object,
// and strip away unnecessary __v and _id from it.
// Check mongoosejs.com/doc for more info.
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Contact', contactSchema)
