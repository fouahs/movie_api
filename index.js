const express = require("express"),
    bodyParser = require("body-parser"),
    uuid = require("uuid"),
    morgan = require("morgan"),
    mongoose = require("mongoose"),
    Models = require("./models.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("common"));

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", (req, res) => {
  res.send("Welcome to my app!\n");
});

app.get("/documentation", (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

// Returning a list of all movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

// Returning data about a single movie by title
app.get("/movies/:title", (req, res) => {
  res.json(movies.find((movie) =>
  { return movie.title === req.params.title }));
});

// Returning data about a genre by name/title
app.get("/movies/genres/:name", (req, res) => {
  res.send("Successful GET request returning data on a genre.");
});

// Returning data about a director by name
app.get("/movies/directors/:name", (req, res) => {
  res.send("Successful GET request returning data on a director.");
});

// Adding a user
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Updating a user's info, by username
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// Adding a movie to a user's list of favorites
app.post("/users/:Username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// Removing a movie from a user's list of favorites
app.delete("/users/:username/favorites", (req, res) => {
  res.send("Successful DELETE request removing a movie from a user's list of favorites.");
});

// Deleting a user by username
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("An error occurred!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});