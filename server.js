
const fs = require("fs");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");
const userNotes = require("./db/db.json")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});



app.get("/api/notes", (req, res) => {
    console.log(userNotes);
    return res.json(userNotes);   


});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = (userNotes.length).toString();

    userNotes.push(newNote);

    fs.writeFile('db/db.json', JSON.stringify(userNotes), (err) => {
        if (err)
            console.log(err);
    })
    res.json(newNote);
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})


app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})