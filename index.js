const mongoose = require('mongoose')

main().catch(err => console.log("err"));

async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/personApp').then(() => {
            console.log("DB connection open")
        }).catch(error => {
            console.log("Error!!!!: " + error);
        });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const personSchema = new mongoose.Schema({
    first: {type: String},
    last: {type: String}
})

personSchema.virtual('fullName').get(function() {
    return `${this.first} ${this.last}`
})

// führe eine funktion aus, bevor etwas gemacht wird, in diesem fall save
personSchema.pre('save', async function() {
    console.log("About to Save....")
})

// führe eine funktion aus, nachdem etwas gemacht wurde, in diesem fall save
personSchema.post('save', async function() {
    console.log("Save Successfull")
})

const Person = new mongoose.model('Person', personSchema)

const alex = new Person({first: "Alex", last: "OHA"})
