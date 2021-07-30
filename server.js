const fs = require("fs");
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const { notes } = require("./data/db");

function findById(id, notesArray) {
  const result = notesArray.filter((note) => note.id === id)[0];
  return result;
}

function createNewNote(body, notesArray) {
  console.log(body);
  // our function's main code will go here!
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./data/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  // return finished code to post route for response
  return note;
}

//------ GET ROUTES------

app.get("/api/db/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  res.json(result);
});

app.get("/api/db", (req, res) => {
  res.json(notes);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './notes.html'));
});


//==========GET Routes =======

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});



app.post("/api/db", (req, res) => {
  // req.body is where our incoming content will be
  console.log(req.body);
  //set id based on what the next index of the array will be
  req.body.id = notes.length.toString();
  // add note to json file and notes array in this function
  const note = createNewNote(req.body, notes);
  res.json(note);
});
