const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/movieApp').then(() => {
            console.log("DB connection open")
        }).catch(error => {
            console.log("Error!!!!: " + error);
        });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

// Erstellung des Models. Titel sollte Einzahl sein und mit einem Großbuchstaben beginnen
const Movie = mongoose.model('Movie', movieSchema);

// Movie.insertMany([
//     {title: "The Thing", year: 1982, score: 8.2, rating: "R"},
//     {title: "Alien", year: 1979, score: 8.5, rating: "R"},
//     {title: "Mad Max", year: 1979, score: 6.8, rating: "R"},
//     {title: "Total Recall", year: 1990, score: 7.5, rating: "R"},
//     {title: "Toy Story", year: 1995, score: 8.3, rating: "PG"}
// ]).then(data => {
//     console.log("It worked!")
//     console.log(data)
// })

// async function movieFinder(title){
//     const movie = await Movie.find({title: title}).exec()
//     console.log("Gefunden: " + movie)
// }

// movieFinder("Mad Max")

// create 
Movie.create({title: "Jack and Jill", year: 2015, score: 2.2, rating: "PG"}).then(res => {console.log(res)})
console.log(Movie.find({title: "Jack and Jill"}))
// finden 
Movie.find({score: {$gte: 8}}).then(data => {console.log(data)})
// ändern (eine option von vielen), return ist nicht der datensatz, sondern ein änderungsobjekt
Movie.updateOne({title: "The Thing"}, {score: 8.8}).then(res => {console.log(res)})
// finden und ändern, drittes object = new:true dann zeigt die method den geänderten datensatz an. default ist alter datensatz
Movie.findOneAndUpdate({title: "Mad Max"}, {score: 7.5}, {new: true}).then(m => {console.log(m)})
// delete (funktioniert in diesem bsp nicht, obwohl code korrekt, vermutlich wird der delete befehl ausgeführt, bevor der datensatz in mongo eingegangen ist), await sollte das regeln
Movie.deleteOne({title: "Jack and Jill"}).then(res => {console.log(res)})
console.log(Movie.find())