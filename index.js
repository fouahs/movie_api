const express = require("express"),
    bodyParser = require("body-parser"),
    uuid = require("uuid");
    morgan = require("morgan");

const app = express();

app.use(bodyParser.json());

app.use(morgan("common"));

let movies = [
  {
    title: "The Lord of the Rings",
    director: "Peter Jackson",
    year: 2001
  },
  {
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010
  },
  {
    title: "Matrix",
    director: "The Wachowskis",
    year: 1999
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008
  },
  {
    title: "Star Wars",
    director: "George Lucas",
    year: 1997
  },
  {
    title: "Interstellar",
    director: "Christopher Nolan",
    year: 2014
  },
  {
    title: "The Green Mile",
    director: "Frank Darabont",
    year: 1999
  },
  {
    title: "Spirited Away",
    director: "Hayao Miyazaki",
    year: 2001
  },
  {
    title: "Gladiator",
    director: "Ridley Scott",
    year: 2000
  },
  {
    title: "The Last Samurai",
    director: "Edward Zwick",
    year: 2004
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to my app!\n");
});

app.get("/documentation", (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get("/movies/:title", (req, res) => {
  res.json(movies.find((movie) =>
  { return movie.title === req.params.title }));
});

app.get("/movies/genres/:name", (req, res) => {
  res.send("Successful GET request returning data on a genre.");
});

app.get("/movies/directors/:name", (req, res) => {
  res.send("Successful GET request returning data on a director.");
});

app.post("/users", (req, res) => {
  res.send("Successful POST request registering a new user.");
});

app.put("/users/:username", (req, res) => {
  res.send("Successful PUT request updating a users's info.");
});

app.post("/users/:username/favorites", (req, res) => {
  res.send("Successful POST request adding a movie to a user's list of favorites.");
});

app.delete("/users/:username/favorites", (req, res) => {
  res.send("Successful DELETE request removing a movie from a user's list of favorites.");
});

app.delete("/users", (req, res) => {
  res.send("Successful DELETE request deregistering a user.");
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("An error occurred!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});