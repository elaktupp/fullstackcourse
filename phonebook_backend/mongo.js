const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'at least password is required, and optionally new contact name and number'
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv.length > 3 ? process.argv[3] : null
const number = process.argv.length > 4 ? process.argv[4] : null

const url = `mongodb+srv://kijutu:${password}@cluster0.kpqrp.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Model according to Schema
const Contact = mongoose.model('Contact', contactSchema)

if (name && number) {
  // Name and number given, add as new contact
  const contact = new Contact({
    name: name,
    number: number,
  })

  contact.save().then(() => {
    console.log(`Added ${contact.name} number ${contact.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  // Password only or either name or number is missing
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
}
