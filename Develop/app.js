var express = require("express");
var fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));

// End point to handle the localhost:3000
app.get("/", (req, res) => {
    fs.readFile("./public/index.html", "utf8", function(err, data) {
        res.send(data);
    });
});

// End point to handle the localhost:3000/notes
app.get("/notes", (req, res) => {
    fs.readFile("./public/notes.html", "utf8", function(err, data) {
        res.send(data);
    });
});

// Handle API request of the localhost:3000/api/notes
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", function(err, data) {
        res.send(data);
    });
});