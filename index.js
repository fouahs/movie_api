const express = require("express"),
    bodyParser = require("body-parser"),
    uuid = require("uuid");
    morgan = require("morgan");

const app = express();

app.use(bodyParser.json());

let movies = [
  {
    title: "The Lord of the Rings",
    year: 2001
  },
  {
    title: "Inception",
    year: 2010
  },
  {
    title: "Matrix",
    year: 1999
  },
  {
    title: "The Dark Knight",
    year: 2008
  },
  {
    title: "Star Wars",
    year: 1997
  },
  {
    title: "Interstellar",
    year: 2014
  },
  {
    title: "The Green Mile",
    year: 1999
  },
  {
    title: "Sprited Away",
    year: 2001
  },
  {
    title: "Gladiator",
    year: 2000
  },
  {
    title: "The Last Samurai",
    year: 2004
  },
];

app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Welcome to my app!\n");
});

// Gets the list of data about all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Gets the data about a single movie, by title
app.get("/movies/:title", (req, res) => {
  res.json(movies.find((movie) =>
  { return movie.title === req.params.title }));
});

// Adds data for a new movie to our list of movies
app.post('/movies', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing title in request body';
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

// Deletes a movie from our list by title
app.delete('/movies/:title', (req, res) => {
  let movies = movies.find((movie) =>
  { return movie.title === req.params.title });

  if (movies) {
    movies = movies.filter((obj) =>
    { return obj.title !== req.params.title });
    res.status(201).send('Movie ' + req.params.title + ' was deleted.');
  }
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("An error occurred!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});