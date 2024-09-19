const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kijutu:${password}@cluster0.kpqrp.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// Model according to Schema
const Note = mongoose.model('Note', noteSchema)

// Create DATA
// Note.insertMany([
//   { content: "HTML is easy.", important: true },
//   { content: "CSS is hard.", important: true },
//   { content: "Mongoose makes things easy.", important: true },
// ])
//   .then(() => {
//     console.log("Data added");
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });

// Print out Collection
// Could set find() parameters,
// e.g. Documents where content starts with "C".
// Note.find({content: {$regex: "^C"}}).then...
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})
