const express = require("express"),
    morgan = require("morgan");

const app = express();

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

let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
}

app.use(requestTime);

app.use(morgan("common"));

app.get("/", (req, res) => {
  let responseText = "Welcome to my app!\n";
  responseText += "<small>Requested at: " + requestTime + "</small>";
  res.send(responseText);
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get("/secreturl", (req, res) => {
  let responseText = "This is a secret url with super top-secret content.";
  responseText += "<small>Requested at: " + requestTime + "</small>";
  res.send(responseText);
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("An error occurred!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});