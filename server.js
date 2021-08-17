// SET UP DEPENDENCIES & BOILERPLATE //
const fs = require("fs");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// IMPORT THE "PATH" module here //
const path = require("path");
//// SET VARIABLE THAT REQUIRES DB FILE TO ACCESS DATA //
const userNotes = require("./db/db.json")

//// set up Express app to handle data parsing ////
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// END BOILERPLATE & DEPENDENCIES //

/// ROUTES START HERE ///////////////
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

/// GET /NOTES SHOULD RETURN THE NOTES.HTML FILE
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


//// GET /api/notes should read the db.json file and return all saved notes json
app.get("/api/notes", (req, res) => {
    console.log(userNotes);
    return res.json(userNotes);   /// will return all userNotes in json format 


});


// POST /API/NOTES SHOULD RECEIVE A NEW NOTE TO SAVE ON THE REQUEST BODY AND ADD IT TO DB.JSON FILE, & RETURN NEW NOTE TO CLIENT 
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = (userNotes.length).toString();

    userNotes.push(newNote);

    // WRITE FILE, STRINGIFY USERNOTES ARRAY, AND LOG ERROR IF THERE 
    fs.writeFile(notes, JSON.stringify(userNotes), (err) => {
        if (err)
            console.log(err);
    })
    res.json(newNote);
})

// app.delete("api/notes/:id", (req, res) => {
//     for (let i = 0; i < userNotes.length; i++) {
//         let deleteNote = userNotes[i];


// }


// THE * ROUTE WILL RETURN USER TO HOME PAGE AND SHOULD ALWAYS COME AFTER OTHER ROUTES THAT 'GET' OR IT WILL TAKE PRECEDENCE OVER THE OTHERS. // 
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

// APP IS LISTENING TO PORT //
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})





















// const express = require("express");
// const PORT = process.env.PORT || 3001;
// const app = express();
// const fs = require("fs")
// const path = require("path")

// //parse incoming string or array data
// app.use(express.urlencoded({extended: true}));
// //parse incoming JSON data
// app.use(express.json());
// app.use(express.static("public"));

// const notesArray = [];





// //HTML Routes

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/index.html"))
// });

// app.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/notes.html"))
// });


// // API Routes
//  app.get('/api/notes', (req, res) => {
//    return res.json(notesArray)
//  });

//  app.post('/api/notes', (req, res) => {
//  const note = req.body;
//  note.id = notesArray.length.toString();
//  notesArray.push(note);

//  fs.writeFile('data/db.json', JSON.stringify(notesArray), (err) => {
//    if (err) console.log(err);
//  })
//   res.json(notesArray);
// })



// const fs = require("fs");
// const path = require("path");
// const express = require("express");
// const PORT = process.env.PORT || 3001;
// const app = express();
// // parse incoming string or array data
// app.use(express.urlencoded({ extended: true }));
// // parse incoming JSON data
// app.use(express.json());
// const { notes } = require("./data/db");

// function findById(id, notesArray) {
//   const result = notesArray.filter((note) => note.id === id)[0];
//   return result;
// }

// function createNewNote(body, notesArray) {
//   console.log(body);
//   // our function's main code will go here!
//   const note = body;
//   notesArray.push(note);
//   fs.writeFileSync(
//     path.join(__dirname, "./data/db.json"),
//     JSON.stringify({ notes: notesArray }, null, 2)
//   );

//   // return finished code to post route for response
//   return note;
// }

// //------ GET ROUTES------

// app.get("/api/db/:id", (req, res) => {
//   const result = findById(req.params.id, notes);
//   res.json(result);
// });

// app.get("/api/db", (req, res) => {
//   res.json(notes);
// });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './Develop/public/index.html'));
// });

// app.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
// });

// // app.get('/', (req, res) => {
// //   res.sendFile(path.join(__dirname, './notes.html'));
// // });


// //==========GET Routes =======

// app.listen(PORT, () => {
//   console.log(`API server now on port ${PORT}!`);
// });



// app.post("/api/db", (req, res) => {
//   // req.body is where our incoming content will be
//   console.log(req.body);
//   //set id based on what the next index of the array will be
//   req.body.id = notes.length.toString();
//   // add note to json file and notes array in this function
//   const note = createNewNote(req.body, notes);
//   res.json(note);
// });
