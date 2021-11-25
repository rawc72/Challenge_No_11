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

// Handle delete function for the path parameter
app.delete("/api/notes/:id", (req, res) => {
    var deleteId = req.params.id;

    fs.readFile("./db/db.json", "utf8", function(err, data) {
        var dbNoteList = JSON.parse(data);
        const newDBNoteList = dbNoteList.filter(
            (note) => Number(note.id) !== Number(deleteId)
        );

        fs.writeFile("./db/db.json", JSON.stringify(newDBNoteList), function(err) {
            if (err) {
                res.status(500);
                res.send("{'status':'failed'}");
            }
            res.status(200);
            res.send("{'status':'ok'}");
        });
    });
});

// API to insert new notes
app.post("/api/notes", (req, res) => {
    var request = req.body;

    fs.readFile("./db/db.json", "utf8", function(err, data) {
        var dbNoteList = JSON.parse(data);
        if (dbNoteList.length === 0) {
            var newNote = {};
            newNote.id = 1;
            newNote.title = request.title;
            newNote.text = request.text;
            dbNoteList.push(newNote);
        } else {
            let lastId = dbNoteList.slice(-1)[0].id;
            var newNote = {};
            newNote.id = lastId + 1;
            newNote.title = request.title;
            newNote.text = request.text;
            dbNoteList.push(newNote);
        }
        fs.writeFile("./db/db.json", JSON.stringify(dbNoteList), function(err) {
            if (err) {
                res.status(500);
                res.send("{'status':'failed'}");
            }
            res.status(200);
            res.send("{'status':'ok'}");
        });
    });
});

var server_port = process.env.PORT || 80;
var server_host = '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});